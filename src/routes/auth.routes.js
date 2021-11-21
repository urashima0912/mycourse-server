const { Router } = require("express");
const controllers = require("../controllers");
const helpers = require("../helpers");

const avatar = "avatar";
const upload = helpers.multer.genUpload();

class Auth {
  constructor() {
    this.router = Router();

    this.#student();
    this.#teacher();
    this.#login();
  }

  #student() {
    this.router.post(
      "/student/sign-up",
      upload.single(avatar),
      controllers.Auth.student.signUp
    );
    this.router.post("/student/active", controllers.Auth.student.active);
    this.router.post(
      "/student/activeAgain",
      controllers.Auth.student.activeAgain
    );
  }

  #teacher() {
    this.router.post(
      "/teacher/sign-up",
      upload.single(avatar),
      controllers.Auth.teacher.signUp
    );
    this.router.get(
      "/teacher/active/:teacherId/:code",
      controllers.Auth.teacher.active
    );
  }

  #login() {
    this.router.post("/login", controllers.Auth.login);
  }
}

module.exports = new Auth();
