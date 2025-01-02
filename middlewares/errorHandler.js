const logger = require("../logger/logger");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //establece el código de estado de error, por defecto 500
  err.status = err.status || "error"; //establece el estado de error, por defecto 'error'

  //registra el error incluyendo la IP del cliente
  logger.error(
    `ERROR ${err.statusCode} - ${req.method} ${req.path} - ${err.status} - ${err.message} IP:${req.ip}`
  ); //registra el error

  res.status(err.statusCode).json({
    //envia la respuesta al cliente
    status: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;
