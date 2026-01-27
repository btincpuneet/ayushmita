
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const router = express.Router();


// const uploadDir = path.join(process.cwd(), "uploads/editor");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) cb(null, true);
//     else cb(new Error("Only images allowed"));
//   },
// });


// router.post("/upload/editor-image", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false });
//   }

//   const imageUrl = `${req.protocol}://${req.get("host")}/uploads/editor/${req.file.filename}`;

//  return res.json({
//     success: true,
//     data: {
//       url: imageUrl
//     }
//   });
// });

// module.exports = router;
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads/editor");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }, fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only images allowed"));
    },
});

router.post("/upload/editor-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/editor/${req.file.filename}`;

    return res.json({
        success: true,
        url: imageUrl,
    });
});

module.exports = router;
