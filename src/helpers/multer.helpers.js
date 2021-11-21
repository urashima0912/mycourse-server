const multer = require("multer");
const path = require("path");

const $storage = (dest) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const arrayDir = __dirname.split("\\");
      arrayDir.pop();
      const filePath = path.join(arrayDir.join("/"), "public", dest);
      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      const fileName = new Date().getTime() + "";
      cb(null, fileName + ".jpg");
    },
  });
};

const genUpload = (dest = "avatar") => {
  return multer({ storage: $storage(dest) });
};

module.exports = {
  genUpload,
};
