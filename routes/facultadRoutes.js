const router = require("express").Router();
//const AppError = require("../errors/AppErrors")

const {
  createFacultad,
  deleteFacultad,
  getFacultades,
  getFacultadById,
  updateFacultad,
} = require("../controller/facultadController");
const AppError = require("../errors/AppErrors");
const authenticate = require("../middlewares/authenticate");

/**
 * @swagger
 * /facultad/{id}:
 *   get:
 *     tags:
 *       - Facultad
 *     summary: Obtener una facultad por ID
 *     description: Retorna la facultad registrada con el ID especificado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la facultad que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facultad obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facultad'
 *       404:
 *         description: Facultad no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/facultad/:id",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("el id es requerido", 400);
    }
    try {
      const facultad = await getFacultadById(id);

      if (!facultad) {
        throw new AppError("facultad no encontrada", 404);
      }
      res.status(200).json(facultad);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /facultad:
 *   get:
 *     tags:
 *       - Facultad
 *     summary: Obtener todas las facultades
 *     description: Retorna una lista de todas las facultades registradas
 *     responses:
 *       200:
 *         description: Lista de facultades obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Facultad'
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/facultad",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const facultades = await getFacultades();
      res.status(200).json(facultades);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /facultad/create:
 *   post:
 *     tags:
 *       - Facultad
 *     summary: Crear una nueva facultad
 *     description: Crea una nueva facultad en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - responsable
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la facultad
 *               responsable:
 *                 type: string
 *                 description: Nombre del responsable de la facultad
 *     responses:
 *       200:
 *         description: Facultad creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/facultad/create",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const { nombre, responsable } = req.body;

      if (!nombre || !responsable) {
        throw new AppError("el nombre y responsable son requeridos", 400);
      }
      const facultad = await createFacultad(nombre, responsable);
      res.status(200).json(facultad);
    } catch (error) {
      if (error?.parent?.detail.includes("nombre")) {
        return next(new AppError("La facultad ya existe", 400));
      }
      next(error);
    }
  }
);

/**
 * @swagger
 * /facultad/update/{id}:
 *   put:
 *     tags:
 *       - Facultad
 *     summary: Actualizar una facultad
 *     description: Actualiza los datos de una facultad existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la facultad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - responsable
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la facultad
 *               responsable:
 *                 type: string
 *                 description: Nombre del responsable de la facultad
 *     responses:
 *       200:
 *         description: Facultad actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Facultad no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put(
  "/facultad/update/:id",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const { nombre, responsable } = req.body;
      const { id } = req.params;

      console.log(req.body);

      if (!id) {
        throw new AppError("el id es requerido", 400);
      }
      if (!nombre || !responsable) {
        throw new AppError("todos los campos son requeridos", 400);
      }
      const facultad = await updateFacultad(id, nombre, responsable);

      if (facultad == 0) {
        throw new AppError("facultad no encontrada", 404);
      }
      res.status(200).json({ message: "facultad editada exsitosamente" });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /facultad/delete/{id}:
 *   delete:
 *     tags:
 *       - Facultad
 *     summary: Eliminar una facultad
 *     description: Elimina una facultad existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facultad eliminada exitosamente
 *       404:
 *         description: Facultad no encontrada
 */
router.delete(
  "/facultad/delete/:id",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError("el id es requerido", 400);
      }

      const facultad = await deleteFacultad(id);

      if (facultad == 0) {
        throw new AppError("facultad no encontrada", 404);
      }
      res.status(200).json({ message: "facultad eliminada exsitosamente" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
module.exports = router;
