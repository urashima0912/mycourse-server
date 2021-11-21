const controllers = require("../controllers");

class Module {
  constructor() {
    this.router = require("express").Router();
    this.router.post("/create", this.#create);
  }

  #create(req, res, _) {
    return controllers.Module.create(req, res);
  }
}

module.exports = new Module();
