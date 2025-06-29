import { __dirname } from "../utils/utils.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// Crear directorios si no existen
const uploadDirs = [
  path.join(__dirname, "..", "public", "pet"),
  path.join(__dirname, "..", "public", "document"),
  path.join(__dirname, "..", "public", "others"),
];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "others";

    if (file.fieldname === "image") {
      folder = "pet";
    } else if (file.fieldname === "document") {
      folder = "document";
    }

    const dir = path.join(__dirname, "..", "public", folder);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Configuración más permisiva para pruebas
const fileFilter = (req, file, cb) => {
  cb(null, true); // Aceptar todos los archivos temporalmente
};

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Límite de 10MB
});

export default uploader;
