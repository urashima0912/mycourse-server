const controllers = require("../controllers");
const values = require("../values");

class Category {
  constructor() {
    this.router = require("express").Router();
    this.#create();
  }

  #create() {
    this.router.post("/create", controllers.Category.create);
  }
}

module.exports = new Category();
