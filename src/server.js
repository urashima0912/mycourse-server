const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

class Server {
  constructor() {
    this.server = express();
    this.#initialize();
  }

  #initialize() {
    // Settings.
    // this.server.set("port", 4500);
    this.port = 4500;

    // Middlewares
    this.server.use(cors());
    this.server.use(morgan("dev"));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));

    // Routes.
    this.server.use("/api/auth", routes.Auth.router);
    this.server.use("/api/package", routes.Package.router);
    this.server.use("/api/special", routes.Special.router);
    this.server.use("/api/course", routes.Course.router);
    this.server.use("/api/category", routes.Category.router);
    this.server.use("/api/module", routes.Module.router);
    this.server.use("/api/question", routes.Question.router);

    // Public folder.
    this.server.use(express.static(path.join(__dirname, "public")));
  }

  run() {
    this.server.listen(this.port, () => {
      console.log("Server is runnig on port: ", this.port);
    });
  }
}

module.exports = new Server();
