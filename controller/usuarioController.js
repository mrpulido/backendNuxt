const Profesor = require("../models/profesor");
const Usuario = require("../models/usuario");
const { hashPassword } = require("../helpers/hash");

const createUsuario = async (nombre_usuario, contrasena, rol) => {
  // en el controoller de encuesta ,usuarioId  yo tengo muchos evaluaciones evaluaciones tiene el id
  try {
    const hashedPassword = await hashPassword(contrasena); // Hashear la contraseña
    const usuario = await Usuario.create({
      nombre_usuario,
      contrasena: hashedPassword,
      rol,
    });
    //usuario.setEncuesta(Encuestaid)     //usuarioId
    return usuario;
  } catch (error) {
    throw error;
  }
};

const getUsuarioById = async (id) => {
  const usuario = await Usuario.findByPk(id, {
    attributes: { exclude: ["contrasena"] },
  });
  return usuario;
};

const getUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["contrasena"] },
    });
    return usuarios;
  } catch (error) {
    throw error;
  }
};

const updateUsuario = async (id, nombre_usuario, contrasena, rol) => {
  try {
    const updateData = { nombre_usuario, rol };

    if (contrasena !== undefined) {
      updateData.contrasena = await hashPassword(contrasena); // Hashear la nueva contraseña solo si se proporciona
    }

    const usuario = await Usuario.update(updateData, { where: { id } });
    return usuario;
  } catch (error) {
    throw error;
  }
};

const deleteUsuario = async (id) => {
  try {
    const usuario = await Usuario.destroy({ where: { id } });
    return usuario;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
};
