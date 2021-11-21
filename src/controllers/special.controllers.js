const values = require("../values");

class Special {
  constructor() {
    this.models = require("../models");
  }

  buy(type, req, res) {
    return this.func(req, res, this)[type]();
  }

  func(req, res, scope) {
    return {
      async [values.statics.teacher]() {
        try {
          const { teacherId, packageId } = req.body;

          const teacher = await scope.models.user.findById(teacherId);
          if (!teacher) {
            return res.status(400).json({ error: "The user does not  exist" });
          }

          const pack = await scope.models.package.findById(packageId);
          if (!pack) {
            return res
              .status(400)
              .json({ error: "The package does not  exist" });
          }

          const buy = await scope.models.teacher_package.create({
            teacher,
            package: pack,
            price: pack.price,
            curses: [],
          });

          return res.status(201).json({ buy });
        } catch (e) {
          console.log(e);
          return res.status(400).json({ error: e });
        }
      },
      async [values.statics.student]() {
        try {
          const { studentId, courseId } = req.body;
          const student = await scope.models.user.findById(studentId);
          if (!student) {
            throw "student does not exist";
          }

          const course = await scope.models.course.findById(courseId);
          if (!course) {
            throw "course does not exist";
          }

          if (!course.active) {
            throw "Course is not active";
          }

          const studentModules = [];

          for (const _moduleId of course.modules) {
            const studentQuestions = [];
            const _module = await scope.models._module.findById(_moduleId);
            for (const questionId of _module.questions) {
              const sQuestion = await scope.models.studentQuestion.create({
                question: questionId,
                response: -1,
              });
              studentQuestions.push(sQuestion);
            }

            const sModules = await scope.models.studentModule.create({
              module: _module,
              studentQuestions,
            });
            studentModules.push(sModules);
          }

          const buyStudent = await scope.models.buyStudent.create({
            student,
            course,
            price: course.price,
            studentModules,
          });

          return res.status(201).json({ buyStudent });
        } catch (e) {
          console.log({ e });
          return res.status(400).json({ error: e });
        }
      },
    };
  }
}

module.exports = new Special();
