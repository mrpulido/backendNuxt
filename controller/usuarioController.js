const Profesor = require("../models/profesor");
const Usuario = require("../models/usuario");

const createUsuario = async (nombre_usuario, contrasena, rol) => {
  // en el controoller de encuesta ,usuarioId  yo tengo muchos evaluaciones evaluaciones tiene el id
  try {
    const usuario = await Usuario.create({ nombre_usuario, contrasena, rol });
    //usuario.setEncuesta(Encuestaid)     //usuarioId
    return usuario;
  } catch (error) {
    throw error;
  }
};

const getUsuarioById = async (id) => {
  const usuario = await Usuario.findByPk(id);
  return usuario;
};

const getUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    throw error;
  }
};

const updateUsuario = async (id, nombre_usuario, contrasena, rol) => {
  try {
    const usuario = await Usuario.update(
      { nombre_usuario, contrasena, rol },
      { where: { id } }
    );
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
