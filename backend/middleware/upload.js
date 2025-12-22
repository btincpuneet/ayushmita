const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Allowed image extensions
const allowedExt = [".png", ".jpg", ".jpeg", ".webp"];

// MAIN FUNCTION
const fileStorage = (folderName) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        const uploadPath = `uploads/${folderName}`;

        // AUTO CREATE FOLDER
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
      } catch (err) {
        console.error("🔥 Folder Create Error:", err);
        cb(err);
      }
    },

    filename: function (req, file, cb) {
      try {
        cb(null, Date.now() + path.extname(file.originalname));
      } catch (err) {
        console.error("🔥 Filename Error:", err);
        cb(err);
      }
    },
  });

// CUSTOM FILE FILTER (FOR IMAGE ERRORS)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    const err = new Error("Only PNG, JPG, JPEG, WEBP images are allowed!");
    console.error("🔥 Invalid File Error:", err.message);
    return cb(err);
  }

  cb(null, true);
};

// RETURN MULTER UPLOADER WITH ERROR CAPTURE
const multerWithErrors = (folder) =>
  multer({
    storage: fileStorage(folder),
    fileFilter,
  });

exports.uploadDisease = multerWithErrors("diseases");
exports.uploadTreatment = multerWithErrors("treatments");
