const multer = require("multer");

const storage = multer.memoryStorage(); // permet d'utiliser buffer

const upload = multer({ storage });

module.exports = upload;

