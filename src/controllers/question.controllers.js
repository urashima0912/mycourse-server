const models = require("../models");

class Question {
  async create(req, res) {
    try {
      const { title, options, response, moduleId } = req.body;

      const _module = await models._module.findById(moduleId);
      if (!_module) {
        throw "Module does not exist";
      }

      const question = await models.question.create({
        title,
        options,
        response,
      });

      _module.questions.push(question);
      await _module.save();

      return res.status(201).json({ module: _module });
    } catch (e) {
      console.log({ e });
      return res.json({ error: e });
    }
  }
}

module.exports = new Question();
