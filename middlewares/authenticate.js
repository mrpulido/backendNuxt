const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppErrors");

const authenticate = (roles) => {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new AppError("Necesita iniciar sesión", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.includes(decodeToken.rol)) {
        req.userData = { userId: decodeToken.id };
        next();
      } else {
        return next(new AppError("No tiene permisos para esta acción", 401));
      }
    } catch (error) {
      return next(new AppError("Permiso denegado", 403));
    }
  };
};
module.exports = authenticate;
