const controllers = require("../controllers");
const values = require("../values");

class Special {
  constructor() {
    this.router = require("express").Router();
    this.#routes();
  }

  #routes() {
    return this.router.post(`/buy/:type`, function (req, res) {
      const { type } = req.params;
      if (![values.statics.teacher, values.statics.student].includes(type)) {
        return res.sendStatus(400);
      }

      controllers.Special.buy(type, req, res);
    });
  }
}

module.exports = new Special();
