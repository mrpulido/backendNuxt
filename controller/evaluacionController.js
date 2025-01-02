const Evaluacion = require("../models/evaluacion");

const createEvaluacion = async (tipo, criterioId) => {
  const evaluacion = await Evaluacion.create({ tipo, criterioId });
  return evaluacion;
};

const getEvaluacionById = async (id) => {
  const evaluacion = await Evaluacion.findByPk(id);
  return evaluacion;
};

const getEvaluaciones = async () => {
  const evaluaciones = await Evaluacion.findAll();
  return evaluaciones;
};

const updateEvaluaciones = async (id, tipo) => {
  const evaluacion = await Evaluacion.update({ tipo }, { where: { id } });
  return evaluacion;
};

const deleteEvaluacion = async (id) => {
  const evaluacion = await Evaluacion.destroy({ where: { id } });
  return evaluacion;
};

module.exports = {
  createEvaluacion,
  getEvaluaciones,
  getEvaluacionById,
  updateEvaluaciones,
  deleteEvaluacion,
};
