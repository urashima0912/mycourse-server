const models = require("../models");

class Module {
  async create(req, res) {
    try {
      const { description, title, courseId } = req.body;

      const course = await models.course.findById(courseId);
      if (!course) {
        throw "Course does not exist";
      }

      const _module = await models._module.create({
        description,
        title,
        questions: [],
      });

      course.modules.push(_module);
      await course.save();

      return res.status(201).json({ course });
    } catch (e) {
      return res.json({ error: e });
    }
  }
}

module.exports = new Module();
