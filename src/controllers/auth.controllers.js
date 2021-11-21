const student = require("./auth/student.auth");
const teacher = require("./auth/teacher.auth");

class Auth {
  constructor() {
    this.student = student;
    this.teacher = teacher;
  }

  login(req, res) {
    return res.json("login");
  }
}

module.exports = new Auth();
