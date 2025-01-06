const router = require("express").Router();
//const AppError = require("../errors/AppErrors")

const {
  createEncuesta,
  deleteEncuesta,
  getEncuestaById,
  getEncuestas,
  updateEncuesta,
} = require("../controller/encuestaController");
const AppError = require("../errors/AppErrors");

/**
 * @swagger
 * /encuesta/{id}:
 *   get:
 *     tags:
 *       - Encuestas
 *     summary: Obtener una encuesta por ID
 *     description: Retorna los detalles de una encuesta específica basada en el ID proporcionado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la encuesta que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Encuesta obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encuesta'
 *       404:
 *         description: Encuesta no encontrada con el ID proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get("/encuesta/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("el id es requerido", 400);
  }
  try {
    const encuesta = await getEncuestaById(id);

    if (!encuesta) {
      throw new AppError("encuesta no encontrada", 404);
    }
    res.status(200).json(encuesta);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /encuesta:
 *   get:
 *     tags:
 *       - Encuestas
 *     summary: Obtener todas las encuestas
 *     description: Retorna una lista de todas las encuestas registradas
 *     responses:
 *       200:
 *         description: Lista de encuestas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Encuesta'
 *       500:
 *         description: Error del servidor
 */
router.get("/encuesta", async (req, res, next) => {
  try {
    const encuesta = await getEncuestas();
    res.status(200).json(encuesta);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /encuesta/create:
 *   post:
 *     tags:
 *       - Encuestas
 *     summary: Crear una nueva encuesta
 *     description: Crea una nueva encuesta en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - usuarioId
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Encuesta de satisfacción"
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *               profesores:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Encuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encuesta'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/encuesta/create", async (req, res, next) => {
  try {
    const { nombre, profesores, usuarioId } = req.body;
    console.log(req.body);
    if (!nombre || !usuarioId) {
      throw new AppError("Todos los campos son requeridos", 400);
    }
    const encuesta = await createEncuesta(nombre, usuarioId, profesores);
    res.status(200).json(encuesta);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @swagger
 * /encuesta/update/{id}:
 *   put:
 *     tags:
 *       - Encuestas
 *     summary: Actualizar una encuesta
 *     description: Actualiza los datos de una encuesta existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la encuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Encuesta de satisfacción actualizada"
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *               profesores:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Encuesta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encuesta'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.put("/encuesta/update/:id", async (req, res, next) => {
  try {
    const { nombre, profesores } = req.body;
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }
    if (!nombre) {
      throw new AppError("todos los campos son requeridos", 400);
    }
    const encuesta = await updateEncuesta(id, nombre, profesores);

    if (encuesta == 0) {
      throw new AppError("encuesta no encontrada", 404);
    }
    res.status(200).json({ message: "encuesta editada exsitosamente" });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /encuesta/delete/{id}:
 *   delete:
 *     tags:
 *       - Encuestas
 *     summary: Eliminar una encuesta
 *     description: Elimina una encuesta existente del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la encuesta
 *     responses:
 *       200:
 *         description: Encuesta eliminada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.delete("/encuesta/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }

    const encuesta = await deleteEncuesta(id);

    if (encuesta == 0) {
      throw new AppError("encuesta no encontrada", 404);
    }
    res.status(200).json({ message: "encuesta eliminada exsitosamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
