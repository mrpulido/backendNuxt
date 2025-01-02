const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre_usuario
 *         - contrasena
 *         - rol
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del usuario
 *           example: 1
 *         nombre_usuario:
 *           type: string
 *           description: Nombre de usuario único
 *           minLength: 3
 *           maxLength: 50
 *           example: "juan123"
 *         contrasena:
 *           type: string
 *           description: Contraseña del usuario (hasheada)
 *           format: password
 *           example: "$2a$10$XYZ..."
 *         rol:
 *           type: string
 *           description: Rol del usuario en el sistema
 *           enum: [usuario, admin, moderador]
 *           example: "usuario"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *           example: "2024-03-20T15:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *           example: "2024-03-20T15:30:00.000Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de borrado lógico (si existe)
 *           nullable: true
 *           example: null
 */

const Usuario = sequelize.define("usuario", {
    nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});


module.exports = Usuario;

  