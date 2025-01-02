const router = require("express").Router();
//const AppError = require("../errors/AppErrors")

const {
  createEvaluacion,
  deleteEvaluacion,
  getEvaluaciones,
  getEvaluacionById,
  updateEvaluaciones,
} = require("../controller/evaluacionController");
const AppError = require("../errors/AppErrors");

/**
 * @swagger
 * /evaluaciones/{id}:
 *   get:
 *     tags:
 *       - Evaluaciones
 *     summary: Obtener una evaluación por ID
 *     description: Retorna la evaluación registrada que corresponde al ID proporcionado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la evaluación a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evaluación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluacion'
 *       404:
 *         description: Evaluación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/evaluaciones/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("el id es requerido", 400);
  }
  try {
    const evaluacion = await getEvaluacionById(id);

    if (!evaluacion) {
      throw new AppError("encuesta no encontrada", 404);
    }
    res.status(200).json(evaluacion);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /evaluaciones:
 *   get:
 *     tags:
 *       - Evaluaciones
 *     summary: Obtener todas las evaluaciones
 *     description: Retorna una lista de todas las evaluaciones registradas
 *     responses:
 *       200:
 *         description: Lista de evaluaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evaluacion'
 *       500:
 *         description: Error del servidor
 */
router.get("/evaluaciones", async (req, res, next) => {
  try {
    const evaluaciones = await getEvaluaciones();
    res.status(200).json(evaluaciones);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /evaluaciones/create:
 *   post:
 *     tags:
 *       - Evaluaciones
 *     summary: Crear una nueva evaluación
 *     description: Crea una nueva evaluación en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Tipo de evaluación
 *               criterioId:
 *                 type: integer
 *                 description: criterios asociados
 *     responses:
 *       200:
 *         description: Evaluación creada exitosamente
 *       400:
 *         description: Datos inválidos o tipo no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.post("/evaluaciones/create", async (req, res, next) => {
  try {
    const { tipo, criterioId } = req.body;

    if (!tipo || !criterioId) {
      throw new AppError("el id es requerido", 400);
    }
    const evaluacion = await createEvaluacion(tipo, criterioId);
    res.status(200).json(evaluacion);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /evaluaciones/update/{id}:
 *   put:
 *     tags:
 *       - Evaluaciones
 *     summary: Actualizar una evaluación
 *     description: Actualiza los datos de una evaluación existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Nuevo tipo de evaluación
 *     responses:
 *       200:
 *         description: Evaluación editada exitosamente
 *       400:
 *         description: ID o tipo no proporcionado
 *       404:
 *         description: Evaluación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/evaluaciones/update/:id", async (req, res, next) => {
  try {
    const { tipo } = req.body;
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }
    if (!tipo) {
      throw new AppError("todos los campos son requeridos", 400);
    }
    const evaluacion = await updateEvaluaciones(id, tipo);

    if (evaluacion == 0) {
      throw new AppError("evaluacion no encontrada", 404);
    }
    res.status(200).json({ message: "evaluacion editada exsitosamente" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @swagger
 * /evaluaciones/delete/{id}:
 *   delete:
 *     tags:
 *       - Evaluaciones
 *     summary: Eliminar una evaluación
 *     description: Elimina una evaluación existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Evaluación eliminada exitosamente
 *       400:
 *         description: ID no proporcionado
 *       404:
 *         description: Evaluación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/evaluaciones/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }

    const evaluacion = await deleteEvaluacion(id);

    if (evaluacion == 0) {
      throw new AppError("evaluacion no encontrada", 404);
    }
    res.status(200).json({ message: "evaluacion eliminada exsitosamente" });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Evaluacion:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la evaluación
 *         tipo:
 *           type: string
 *           description: Tipo de evaluación
 *       required:
 *         - tipo
 */

module.exports = router;
