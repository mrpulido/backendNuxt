const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Encuesta = require("./encuesta");

/**
 * @swagger
 * components:
 *   schemas:
 *     Criterio:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del criterio
 *         nombre:
 *           type: string
 *           description: Nombre del criterio
 *         encuestaId:
 *           type: integer
 *           description: ID de la encuesta asociada
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
 *       required:
 *         - nombre
 *         - encuestaId
 */

const Criterio = sequelize.define(
  "criterio",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    encuestaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

// Relación uno a muchos con Encuesta
Encuesta.hasMany(Criterio, {
  foreignKey: "encuestaId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Criterio.belongsTo(Encuesta, {
  foreignKey: "encuestaId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = Criterio;
