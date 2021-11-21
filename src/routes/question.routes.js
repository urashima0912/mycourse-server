const controllers = require("../controllers");

class Question {
  constructor() {
    this.router = require("express").Router();
    this.router.post("/create", this.#create);
  }

  #create(req, res, _) {
    return controllers.Question.create(req, res);
  }
}

module.exports = new Question();
