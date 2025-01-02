const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Criterio = require("./criterio");

/**
 * @swagger
 * components:
 *   schemas:
 *     Evaluacion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la evaluación
 *         tipo:
 *           type: string
 *           description: Tipo de evaluación
 *         criterioId:
 *           type: integer
 *           description: ID del criterio asociado
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
 *         - tipo
 *         - criterioId
 */

const Evaluacion = sequelize.define("evaluacion", {
    tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Relación uno a muchos con Criterio
Criterio.hasMany(Evaluacion, {
    foreignKey: 'criterioId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Evaluacion.belongsTo(Criterio, {
    foreignKey: 'criterioId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  
module.exports = Evaluacion;