const controllers = require("../controllers");
const helpers = require("../helpers");
const values = require("../values");
const middlewares = require("../middlewares");
const upload = helpers.multer.genUpload("course");

class Course {
  constructor() {
    this.router = require("express").Router();
    this.#create();
    this.#switch();
  }

  #create() {
    this.router.post(
      "/create",
      upload.fields([{ name: "images", maxCount: 5 }]),
      middlewares.teacher.createCourse,
      controllers.Course.create
    );
  }

  #switch() {
    this.router.post("/change-state", controllers.Course.changeState);
  }
}

module.exports = new Course();
