const Criterio = require("../models/criterio");

const createCriterio = async (nombre, encuestaId) => {
  const criterio = await Criterio.create({ nombre, encuestaId });
  return criterio;
};

const getCriterioById = async (id) => {
  const criterio = await Criterio.findByPk(id);
  return criterio;
};

const getCriterios = async () => {
  const criterios = await Criterio.findAll();
  return criterios;
};

const updateCriterios = async (id, nombre, encuestaId) => {
  const criterio = await Criterio.update(
    { nombre, encuestaId },
    { where: { id } }
  );
  return criterio;
};

const deleteCriterio = async (id) => {
  const criterio = await Criterio.destroy({ where: { id } });
  return criterio;
};

module.exports = {
  createCriterio,
  getCriterios,
  getCriterioById,
  updateCriterios,
  deleteCriterio,
};
