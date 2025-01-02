const logger = require("../logger/logger");

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} from IP:${req.ip}`); //registra el error

  next();
};

module.exports = requestLogger;
