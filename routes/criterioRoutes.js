const router = require("express").Router();
//const AppError = require("../errors/AppErrors")
const logger = require("../logger/logger");

const {
  createCriterio,
  deleteCriterio,
  getCriterioById,
  getCriterios,
  updateCriterios,
} = require("../controller/criteriosController");
const AppError = require("../errors/AppErrors");
const authenticate = require("../middlewares/authenticate");

/**
 * @swagger
 * /criterios/{id}:
 *   get:
 *     tags:
 *       - Criterios
 *     summary: Obtener criterio por ID
 *     description: Retorna el criterio registrado con el ID especificado
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del criterio a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Criterio obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Criterio'
 *       404:
 *         description: Criterio no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get(
  "/criterios/:id",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("el id es requerido", 400);
    }
    try {
      const criterio = await getCriterioById(id);

      if (!criterio) {
        throw new AppError("criterio no encontrado", 404);
      }
      res.status(200).json(criterio);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /criterios:
 *   get:
 *     tags:
 *       - Criterios
 *     summary: Obtener todos los criterios
 *     description: Retorna una lista de todos los criterios registrados
 *     responses:
 *       200:
 *         description: Lista de criterios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Criterio'
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/criterios",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const criterios = await getCriterios();
      res.status(200).json(criterios);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /criterios/create:
 *   post:
 *     tags:
 *       - Criterios
 *     summary: Crear un nuevo criterio
 *     description: Crea un nuevo criterio en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del criterio
 *               encuestaId:
 *                 type: integer
 *                 description: id de la encuesta
 *     responses:
 *       200:
 *         description: Criterio creado exitosamente
 *       400:
 *         description: Datos inválidos o nombre no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/criterios/create",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const { nombre, encuestaId } = req.body;

      if (!nombre || !encuestaId) {
        throw new AppError("el id es requerido", 400);
      }
      const criterio = await createCriterio(nombre, encuestaId);
      res.status(200).json(criterio);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /criterios/update/{id}:
 *   put:
 *     tags:
 *       - Criterios
 *     summary: Actualizar un criterio
 *     description: Actualiza los datos de un criterio existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del criterio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del criterio
 *     responses:
 *       200:
 *         description: Criterio editado exitosamente
 *       400:
 *         description: Datos inválidos o nombre no proporcionado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
  "/criterios/update/:id",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const { nombre, encuestaId } = req.body;
      const { id } = req.params;

      if (!id) {
        throw new AppError("el id es requerido", 400);
      }
      if (!nombre) {
        throw new AppError("todos los campos son requeridos", 400);
      }
      const criterio = await updateCriterios(id, nombre, encuestaId);

      if (criterio == 0) {
        throw new AppError("usuario no encontrado", 404);
      }
      res.status(200).json({ message: "criterio editado exsitosamente" });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /criterios/delete/{id}:
 *   delete:
 *     tags:
 *       - Criterios
 *     summary: Eliminar un criterio
 *     description: Elimina un criterio existente del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del criterio
 *     responses:
 *       200:
 *         description: Criterio eliminado exitosamente
 *       400:
 *         description: ID no proporcionado
 *       404:
 *         description: Criterio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete(
  "/criterios/delete/:id",
  authenticate(["administrador", "gestor"]),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError("el id es requerido", 400);
      }

      const criterio = await deleteCriterio(id);

      if (criterio == 0) {
        throw new AppError("criterio no encontrado", 404);
      }
      res.status(200).json({ message: "criterio eliminado exsitosamente" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
