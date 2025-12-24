module.exports = (uploader) => {
  return (req, res, next) => {
    uploader(req, res, (err) => {
      if (err) {
        console.log("🔥 Multer Upload Error:", err.message);

        return res.status(400).json({
          success: false,
          message: "File upload failed",
          error: err.message,
        });
      }

      next();
    });
  };
};
