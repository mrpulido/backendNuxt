const Criterio = require("../models/criterio");
const Encuesta = require("../models/encuesta");
const Profesor = require("../models/profesor");

const createEncuesta = async (nombre, usuarioId, profesores) => {
  const encuesta = await Encuesta.create({ nombre, usuarioId });
  if (profesores && profesores.length > 0) {
    await encuesta.setProfesors(profesores);
  }
  return encuesta;
};

const getEncuestaById = async (id) => {
  const encuesta = await Encuesta.findByPk(id, {
    include: [
      { model: Criterio },
      { model: Profesor, attributes: ["id", "nombre"] },
    ],
  });
  return encuesta;
};

const getEncuestas = async () => {
  const encuestas = await Encuesta.findAll({
    include: [
      { model: Criterio },
      { model: Profesor, attributes: ["id", "nombre"] },
    ],
  });
  return encuestas;
};

const updateEncuesta = async (id, nombre, profesores) => {
  const encuesta = await Encuesta.findByPk(id);
  await encuesta.update({ nombre });
  if (profesores && profesores.length > 0) {
    await encuesta.setProfesors(profesores);
  }
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
