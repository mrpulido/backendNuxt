require("dotenv").config();
// Instancia de Sequelize para conectarse a la base de datos
const sequelize = require("./helpers/database.js");
const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Importaciones de los modelos
const Criterio = require("./models/criterio");
const Encuesta = require("./models/encuesta");
const Evaluacion = require("./models/evaluacion");
const Facultad = require("./models/facultad");
const Profesor = require("./models/profesor");
const Usuario = require("./models/usuario");

//Importaciones de las rutas
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const encuestaRoutes = require("./routes/encuestaRoutes.js");
const facultadRoutes = require("./routes/facultadRoutes.js");
const evaluacionRoutes = require("./routes/evaluacionRoutes.js");
const profesorRoutes = require("./routes/profesorRoutes.js");
const criterioRoutes = require("./routes/criterioRoutes.js");

const errorHandler = require("./middlewares/errorHandler.js");
const requestLogger = require("./middlewares/requestLogger.js");

//Swagger definiciones
const opcions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "evaluacion API",
      description: "Backend para el proyecto evaluacion",
      version: "1.0.1",
      contact: {
        name: "Maura Ramos Pulido",
        email: "mauraramospulido@gmail.com",
        url: "",
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJsdoc(opcions);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion cors
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //permitir el envio de cookies
  })
);

app.use(requestLogger);

//uso de las rutas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", usuarioRoutes);
app.use("/", criterioRoutes);
app.use("/", evaluacionRoutes);
app.use("/", profesorRoutes);
app.use("/", facultadRoutes);
app.use("/", encuestaRoutes);

//Middleware de manejo de errores
app.use(errorHandler);

//configurar el puerto para el servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
  console.log(`Documentacion de swagger: http://localhost:${PORT}/api-docs`);
});

// Sincronizar los modelos para verificar la conexión con la base de datos
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Todos los modelos se sincronizaron correctamente.");
  })
  .catch((err) => {
    console.log("Ha ocurrido un error al sincronizar los modelos: ", err);
  });
