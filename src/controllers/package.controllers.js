const path = require("path");

class Package {
  constructor() {
    this.models = require("../models");
  }

  async create(req, res) {
    try {
      const file = req.file;
      const pack = await this.models.package.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: "http://localhost:4500" + "/package/" + file.filename,
        number: req.body.number,
      });

      return res.status(201).json({ package: pack });
    } catch (e) {
      return res.json({ error: e });
    }
  }
}

module.exports = new Package();
