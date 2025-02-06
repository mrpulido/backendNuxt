// multerConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = "uploads/"; // Mantener la carpeta local

// Asegurar que la carpeta existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Supabase
const { createClient } = require("@supabase/supabase-js");
const AppError = require("../errors/AppErrors");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Función auxiliar para manejar la subida de archivos
const handleFileUpload = async (file, title) => {
  if (process.env.IMAGE_SERVICE === "supabase") {
    const uniqueSuffix = Date.now();
    const fileName = `${title.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    )}-${uniqueSuffix}${path.extname(file.originalname)}`;

    try {
      console.log("subiendo");
      const { data, error } = await supabase.storage
        .from("profesores")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Error uploading to Supabase:", error);
        throw new Error("Error uploading to Supabase");
      }

      const { data: urlData, error: urlError } = supabase.storage
        .from("profesores")
        .getPublicUrl(fileName);

      if (urlError) {
        console.error("Error getting public URL:", urlError);
        throw new Error("Error getting public URL");
      }

      return urlData.publicUrl;
    } catch (err) {
      console.error("Unexpected error during file upload:", err);
      throw new Error("Unexpected error during file upload");
    }
  } else {
    // Lógica existente para almacenamiento local
    const uniqueSuffix = Date.now();
    const fileName = `${title.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    )}-${uniqueSuffix}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);
    return `uploads/${fileName}`;
  }
};

const handleDeleteFile = async (file) => {
  if (process.env.IMAGE_SERVICE === "supabase" && file) {
    try {
      await supabase.storage.from("profesores").remove([file]); // Cambiar al bucket "profesores"
    } catch (deleteError) {
      console.error("Error al eliminar la imagen de Supabase:", deleteError);
    }
  } else if (process.env.IMAGE_SERVICE === "server" && file) {
    const filePath = path.join(uploadDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// Modificar la configuración de multer para almacenar en memoria cuando se usa Supabase
const storage = multer.memoryStorage();

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024, // Limitar tamaño a 500kB
  },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|webp|avif|gif|svg/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new AppError("Solo se permiten archivos de imagen", 400));
    }
  },
});

module.exports = { upload, handleFileUpload, handleDeleteFile };
