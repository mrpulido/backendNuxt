// multerConfig.js
const multer = require("multer");
const path = require("path");

// Configurar el almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombra el archivo con un timestamp
  },
});

// Crear la instancia de multer
const upload = multer({ storage: storage });

module.exports = upload;
