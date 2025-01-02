class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //llama al constructor de la clase base Error
    this.statusCode = statusCode; //establece el codigo de estado
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; //determina si es un error del cliente o del servidor
    this.isOperational = true; //marca el error como operativo

    Error.captureStackTrace(this, this.constructor); //captura la pila de llamada
  }
}
module.exports = AppError;
