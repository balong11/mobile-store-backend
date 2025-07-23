const config = require("config");
const multer = require("multer");
const upload = multer ({
    dest: config.get("tmpUpload"),
});
module.exports = upload;