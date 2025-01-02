const Profesor = require("../models/profesor");

const createProfesor = async (nombre, sexo, edad, asignatura, facultadId) => {
  const profesor = await Profesor.create({
    nombre,
    sexo,
    edad,
    asignatura,
    facultadId,
  });
  return profesor;
};

const getProfesorById = async (id) => {
  const profesor = await Profesor.findByPk(id);
  return profesor;
};

const getProfesor = async () => {
  const profesores = await Profesor.findAll();
  return profesores;
};

const updateProfesor = async (
  id,
  nombre,
  sexo,
  edad,
  asignatura,
  facultadId
) => {
  const profesor = await Profesor.update(
    { nombre, sexo, edad, asignatura, facultadId },
    { where: { id } }
  );
  return profesor;
};

const deleteProfesor = async (id) => {
  const profesor = await Profesor.destroy({ where: { id } });
  return Profesor;
};

module.exports = {
  createProfesor,
  getProfesorById,
  getProfesor,
  updateProfesor,
  deleteProfesor,
};
