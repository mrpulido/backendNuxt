const Criterio = require("../models/criterio");
const Encuesta = require("../models/encuesta");

const createEncuesta = async (nombre, usuarioId, profesores) => {
  const encuesta = await Encuesta.create({ nombre, usuarioId });
  //await encuesta.setProfesors(profesores);
  return encuesta;
};

const getEncuestaById = async (id) => {
  const encuesta = await Encuesta.findByPk(id, {
    include: [Criterio],
  });
  return encuesta;
};

const getEncuestas = async () => {
  const encuestas = await Encuesta.findAll({ include: [Criterio] });
  return encuestas;
};

const updateEncuesta = async (id, nombre, profesores) => {
  const encuesta = await Encuesta.findByPk(id);

  await encuesta.update({ nombre });
  //await encuesta.setProfesors(profesores);
  return encuesta;
};

const deleteEncuesta = async (id) => {
  const encuesta = await Encuesta.destroy({ where: { id } });
  return Encuesta;
};

module.exports = {
  createEncuesta,
  getEncuestaById,
  getEncuestas,
  updateEncuesta,
  deleteEncuesta,
};
