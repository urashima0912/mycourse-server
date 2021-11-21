const models = require("../models");

class Course {
  constructor() {}

  async create(req, res) {
    try {
      const category = await models.category.findById(req.body.categoryId);
      if (!category) {
        return res.status(400).json({ error: "The category does not exist" });
      }

      const images = [];
      for (const file of req?.files?.images ?? []) {
        images.push(`http://localhost:4500/course/${file.filename}`);
      }

      const course = await models.course.create({
        title: req.body.title,
        description: req.body.description,
        images,
        modules: [],
        category,
        price: req.body.price,
      });

      const tp = await models.teacher_package.findById(
        req.body.teacherPackageId
      );
      if (!tp) {
        throw "TP does not exist";
      }
      tp.courses.push(course);
      await tp.save();

      return res.status(201).json({ course });
    } catch (e) {
      console.log({ error: e });
      return res.json({ error: e });
    }
  }

  async changeState(req, res) {
    try {
      const { courseId, state } = req.body;

      const course = await models.course.findById(courseId);
      if (!course) {
        throw "The course does not exist";
      }

      course.active = state;
      await course.save();
      return res.status(200).json({ course });
    } catch (e) {
      return res.status(400).json({ e });
    }
  }
}

module.exports = new Course();
