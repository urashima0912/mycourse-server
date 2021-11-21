const models = require("../models");
class Category {
  constructor() {}

  async create(req, res) {
    try {
      const category = await models.category.create({
        title: req.body.title,
      });

      return res.status(201).json({ category });
    } catch (e) {
      return res.json({ error: e });
    }
  }
}

module.exports = new Category();
