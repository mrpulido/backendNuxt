const Profesor = require("../models/profesor");
const Facultad = require("../models/facultad");
const path = require("path");

const createProfesor = async (
  nombre,
  sexo,
  edad,
  asignatura,
  facultadId,
  imagen
) => {
  const imagenPath = imagen ? path.join("uploads", imagen) : null;

  const profesor = await Profesor.create({
    nombre,
    sexo,
    edad,
    asignatura,
    facultadId,
    imagen: imagenPath,
  });
  return profesor;
};

const getProfesorById = async (id) => {
  const profesor = await Profesor.findByPk(id, {
    include: [{ model: Facultad, as: "facultad" }],
  });
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
  facultadId,
  imagen
) => {
  const updateData = {
    nombre,
    sexo,
    edad,
    asignatura,
    facultadId,
  };

  if (imagen) {
    updateData.imagen = path.join("uploads", imagen);
  }

  const [updated] = await Profesor.update(updateData, { where: { id } });

  return updated;
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
