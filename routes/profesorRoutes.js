const router = require("express").Router();
//const AppError = require("../errors/AppErrors")

const {
  createProfesor,
  deleteProfesor,
  getProfesor,
  getProfesorById,
  updateProfesor,
} = require("../controller/profesorController");
const AppError = require("../errors/AppErrors");

/**
 * @swagger
 * /profesor/{id}:
 *   get:
 *     tags:
 *       - Profesores
 *     summary: Obtener un profesor por ID
 *     description: Retorna el profesor registrado que corresponde al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del profesor que se desea obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profesor obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profesor'
 *       404:
 *         description: Profesor no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get("/profesor/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("el id es requerido", 400);
  }
  try {
    const profesor = await getProfesorById(id);

    if (!profesor) {
      throw new AppError("profesor no encontrado", 404);
    }
    res.status(200).json(profesor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /profesor:
 *   get:
 *     tags:
 *       - Profesores
 *     summary: Obtener todos los profesores
 *     description: Retorna una lista de todos los profesores registrados
 *     responses:
 *       200:
 *         description: Lista de profesores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profesor'
 *       500:
 *         description: Error del servidor
 */
router.get("/profesor", async (req, res, next) => {
  try {
    const profesores = await getProfesor();
    res.status(200).json(profesores);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /profesor/create:
 *   post:
 *     tags:
 *       - Profesores
 *     summary: Crear un nuevo profesor
 *     description: Crea un nuevo profesor en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profesor'
 *     responses:
 *       200:
 *         description: Profesor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profesor'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/profesor/create", async (req, res, next) => {
  try {
    const { nombre, sexo, edad, asignatura, facultadId } = req.body;

    if (!nombre || !sexo || !edad || !asignatura) {
      throw new AppError("el id es requerido", 400);
    }
    const profesor = await createProfesor(
      nombre,
      sexo,
      edad,
      asignatura,
      facultadId
    );
    res.status(200).json(profesor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /profesor/update/{id}:
 *   put:
 *     tags:
 *       - Profesores
 *     summary: Actualizar un profesor
 *     description: Actualiza los datos de un profesor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profesor'
 *     responses:
 *       200:
 *         description: Profesor actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/profesor/update/:id", async (req, res, next) => {
  try {
    const { nombre, sexo, edad, asignatura, facultadId } = req.body;
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }
    if (!nombre || !sexo || !edad || !asignatura) {
      throw new AppError("todos los campos son requeridos", 400);
    }
    const profesor = await updateProfesor(
      id,
      nombre,
      sexo,
      edad,
      asignatura,
      facultadId
    );

    if (profesor == 0) {
      throw new AppError("profesor no encontrado", 404);
    }
    res.status(200).json({ message: "profesor editado exsitosamente" });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /profesor/delete/{id}:
 *   delete:
 *     tags:
 *       - Profesores
 *     summary: Eliminar un profesor
 *     description: Elimina un profesor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Profesor eliminado exitosamente
 *       400:
 *         description: ID no proporcionado
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/profesor/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError("el id es requerido", 400);
    }

    const profesor = await deleteProfesor(id);

    if (profesor == 0) {
      throw new AppError("profesor no encontrado", 404);
    }
    res.status(200).json({ message: "profesor eliminado exsitosamente" });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Profesor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del profesor
 *         nombre:
 *           type: string
 *           description: Nombre del profesor
 *         sexo:
 *           type: string
 *           description: Sexo del profesor
 */

module.exports = router;
