/**
 * @swagger
 * components:
 *   schemas:
 *     Encuesta:
 *       type: object
 *       required:
 *         - nombre
 *         - usuarioId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la encuesta
 *         nombre:
 *           type: string
 *           description: Nombre de la encuesta
 *         usuarioId:
 *           type: integer
 *           description: ID del usuario que creó la encuesta
 *         profesores:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Profesor'
 *           description: Lista de profesores asignados a la encuesta
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación (soft delete)
 *       example:
 *         id: 1
 *         nombre: "Encuesta de satisfacción"
 *         usuarioId: 1
 *         profesores: [{ "id": 1, "nombre": "Juan Pérez" }, { "id": 2, "nombre": "Ana Gómez" }]
 *         createdAt: "2024-03-20T15:30:00.000Z"
 *         updatedAt: "2024-03-20T15:30:00.000Z"
 *         deletedAt: null
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Usuario = require("./usuario");
const Profesor = require("./profesor");

const Encuesta = sequelize.define(
  "encuesta",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

// Relación uno a muchos con Usuario
Usuario.hasMany(Encuesta, {
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Encuesta.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Relación muchos a muchos con Profesor
Encuesta.belongsToMany(Profesor, {
  through: "ProfesorEncuesta",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Encuesta;
