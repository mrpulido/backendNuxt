/**
 * @swagger
 * components:
 *   schemas:
 *     Facultad:
 *       type: object
 *       required:
 *         - nombre
 *         - responsable
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la facultad
 *         nombre:
 *           type: string
 *           description: Nombre de la facultad
 *         responsable:
 *           type: string
 *           description: Nombre del responsable de la facultad
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
 *         nombre: "Facultad de Ingeniería"
 *         responsable: "Dr. Juan Pérez"
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Facultad = sequelize.define("facultad", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsable: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  timestamps: true,
  paranoid: true,
});
module.exports = Facultad;  
