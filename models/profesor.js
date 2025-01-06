const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Facultad = require("./facultad");

/**
 * @swagger
 * components:
 *   schemas:
 *     Profesor:
 *       type: object
 *       required:
 *         - nombre
 *         - sexo
 *         - edad
 *         - asignatura
 *         - facultadId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del profesor
 *         nombre:
 *           type: string
 *           description: Nombre del profesor
 *         sexo:
 *           type: string
 *           description: Sexo del profesor
 *         edad:
 *           type: string
 *           description: Edad del profesor
 *         asignatura:
 *           type: string
 *           description: Asignatura que imparte el profesor
 *         imagen:
 *           type: string
 *           description: Imagen del profesor
 *         facultadId:
 *           type: integer
 *           description: ID de la facultad a la que pertenece el profesor
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación (soft delete)
 *       example:
 *         nombre: "Juan Pérez"
 *         sexo: "Masculino"
 *         edad: "45"
 *         asignatura: "Matemáticas"
 *         facultadId: 1
 */

const Profesor = sequelize.define(
  "profesor",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asignatura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facultadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

// Relación uno a muchos con facultad
Facultad.hasMany(Profesor, {
  foreignKey: "facultadId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Profesor.belongsTo(Facultad, {
  foreignKey: "facultadId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = Profesor;
