const models = require("../models");

module.exports = {
  async createCourse(req, res, next) {
    try {
      const { teacherPackageId } = req.body;

      const tp = await models.teacher_package.findById(teacherPackageId);
      if (!tp) {
        throw "TP does not exist";
      }

      req.body.prueba = "hola";
      const pack = await models.package.findById(tp.package);
      if (!pack) {
        throw "pack does not exist";
      }

      const max = pack.number;
      const current = tp.courses.length;
      if (current >= max) {
        throw "current is invalid";
      }

      next();
    } catch (e) {
      console.log({ error: e });
      return res.status(400).json({ error: e });
    }
  },
};
