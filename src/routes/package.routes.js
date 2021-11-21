const controllers = require("../controllers");
const helpers = require("../helpers");

const packageFolder = "package";
const upload = helpers.multer.genUpload(packageFolder);

class Package {
  constructor() {
    this.router = require("express").Router();
    console.log({ controllers: this.controllers });

    this.router.post("/create", upload.single(packageFolder), this.#create);
  }

  #create(req, res, _) {
    return controllers.Package.create(req, res);
  }
}

module.exports = new Package();
