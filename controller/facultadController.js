const Facultad = require("../models/facultad");

const createFacultad = async (nombre, responsable) => {
  const facultad = await Facultad.create({ nombre, responsable });
  return facultad;
};

const getFacultadById = async (id) => {
  const facultad = await Facultad.findByPk(id);
  return facultad;
};

const getFacultades = async () => {
  const facultades = await Facultad.findAll();
  return facultades;
};

const updateFacultad = async (id, nombre, responsable) => {
  const facultad = await Facultad.update(
    { nombre, responsable },
    { where: { id } }
  );
  return facultad;
};

const deleteFacultad = async (id) => {
  const facultad = await Facultad.destroy({ where: { id } });
  return facultad;
};

module.exports = {
  createFacultad,
  getFacultadById,
  getFacultades,
  updateFacultad,
  deleteFacultad,
};
