const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const { comparePassword } = require("../helpers/hash");
const AppError = require("../errors/AppErrors");
const Usuario = require("../models/usuario");

const generateTwoFactorSecret = async (usuarioId, nombre_usuario) => {
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }
  const secret = speakeasy.generateSecret({
    name: `Encuestas:${usuario.nombre_usuario}`,
    length: 20,
  });

  // Actualizar usuario con el nuevo secreto
  await usuario.update({ twoFactorSecret: secret.base32 });

  // Generar QR
  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

  return {
    secret: secret.base32,
    qrCode: qrCodeUrl,
  };
};

const verifyTwoFactorToken = async (usuarioId, code) => {
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }
  const secret = usuario.twoFactorSecret;

  console.log(secret);
  console.log(code);

  const isValid = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: code,
  });
  console.log(isValid);
  if (!isValid) {
    throw new AppError("Código inválido", 401);
  }
  await usuario.update(
    { twoFactorEnabled: true },
    { where: { id: usuarioId } }
  );
};

const getIdFromToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

const login = async (credentials, contrasena) => {
  const usuario = await Usuario.findOne({
    where: {
      [Op.or]: [{ nombre_usuario: credentials }],
    },
  });

  if (!usuario) {
    throw new AppError("Credenciales inválidas", 401);
  }

  const isValidPassword = await comparePassword(contrasena, usuario.contrasena);

  if (!isValidPassword) {
    throw new AppError("Credenciales inválidas", 401);
  }

  // Crear payload para el JWT
  const payload = {
    id: usuario.id,
    nombre_usuario: usuario.nombre_usuario,
    rol: usuario.rol,
  };

  // Generar ambos tokens
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // token de acceso de corta duración
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d", // token de refresco de larga duración
  });

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshTokenProvided) => {
  const decoded = jwt.verify(
    refreshTokenProvided,
    process.env.JWT_REFRESH_SECRET
  );

  const usuario = await Usuario.findOne({
    where: { id: decoded.id },
  });

  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }

  // Generar nuevo access token
  const payload = {
    id: usuario.id,
    nombre_usuario: usuario.nombre_usuario,
    rol: usuario.rol,
  };

  const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    accessToken: newAccessToken,
  };
};

const validateTwoFactorToken = async (usuarioId, code) => {
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }

  if (!usuario.twoFactorEnabled) {
    throw new AppError("2FA no está activado para este usuario", 400);
  }

  const isValid = speakeasy.totp.verify({
    secret: usuario.twoFactorSecret,
    encoding: "base32",
    token: code,
  });

  if (!isValid) {
    throw new AppError("Código inválido", 401);
  }

  return { success: true };
};

module.exports = {
  login,
  refreshToken,
  generateTwoFactorSecret,
  verifyTwoFactorToken,
  getIdFromToken,
  validateTwoFactorToken,
};
