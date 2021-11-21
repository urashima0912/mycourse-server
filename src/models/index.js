const user = require("./user.models");
const category = require("./category.models");
const _module = require("./module.models");
const package = require("./package.models");
const question = require("./question.models");
const teacher_package = require("./teacher_package.models");
const course = require("./course.models");
const studentQuestion = require("./student_question.models");
const studentModule = require("./student_module.models");
const buyStudent = require("./buy_student.models");

module.exports = {
  user,
  category,
  _module,
  package,
  question,
  teacher_package,
  course,
  studentQuestion,
  studentModule,
  buyStudent,
};
