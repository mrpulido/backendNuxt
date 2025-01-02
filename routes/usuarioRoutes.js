const router = require("express").Router();
//const AppError = require("../errors/AppErrors")

const {
  createUsuario,
  deleteUsuario,
  getUsuarioById,
  getUsuarios,
  updateUsuario,
} = require("../controller/usuarioController");
const AppError = require("../errors/AppErrors");

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre_usuario:
 *                   type: string
 *                 rol:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/usuarios/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("el id es requerido", 400);
  }
  try {
    const usuario = await getUsuarioById(id);

    if (!usuario) {
      throw new AppError("usuario no encontrado", 404);
    }
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre_usuario:
 *                     type: string
 *                   rol:
 *                     type: string
 *       500:
 *         description: Error del servidor
 */
router.get("/usuarios", async (req, res, next) => {
  try {
    const usuarios = await getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /usuarios/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_usuario
 *               - contrasena
 *               - rol
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/usuarios/create", async (req, res, next) => {
  try {
    const { nombre_usuario, contrasena, rol } = req.body;

    if (!nombre_usuario || !contrasena || !rol) {
      throw new AppError("el id es requerido", 400);
    }
    const usuario = await createUsuario(nombre_usuario, contrasena, rol);
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /usuarios/update/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_usuario
 *               - contrasena
 *               - rol
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/usuarios/update/:id", async (req, res, next) => {
  try {
    const { nombre_usuario, contrasena, rol } = req.body;
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }
    if (!nombre_usuario || !contrasena || !rol) {
      throw new AppError("todos los campos son requeridos", 400);
    }
    const usuario = await updateUsuario(id, nombre_usuario, contrasena, rol);

    if (usuario == 0) {
      throw new AppError("usuario no encontrado", 404);
    }
    res.status(200).json({ message: "usuario editado exsitosamente" });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /usuarios/delete/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: ID no proporcionado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/usuarios/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }

    const usuario = await deleteUsuario(id);

    if (usuario == 0) {
      throw new AppError("usuario no encontrado", 404);
    }
    res.status(200).json({ message: "usuario eliminado exsitosamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
