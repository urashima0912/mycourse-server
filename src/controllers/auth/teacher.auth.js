const helpers = require("../../helpers");
const models = require("../../models");
const values = require("../../values");
const path = require("path");

const HOURS = 1;

const teacher = {
  async signUp(req, res) {
    try {
      const { email, password } = req.body;
      const file = req.file;

      const user = await models.user.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User exists" });
      }

      const code = helpers.code.generate();
      const hash = await helpers.bcrypt.encrypt(password);

      const newUser = await models.user.create({
        email,
        password: hash,
        avatar: path.join("http://localhost:4500", "avatar", file.filename),
        code,
        type: values.user.teacher,
      });

      const content = `prueba: <a href="http://localhost:4500/api/auth/teacher/active/${newUser._id}/${code}" target="_blank">puchale play</a>`;
      await helpers.email.send(email, content, "welcome to mycourse");

      return res.json({ user: newUser });
    } catch (e) {
      console.log({ e });
      return res.json({ error: e });
    }
  },

  async active(req, res) {
    try {
      const { code, teacherId } = req.params;

      const user = await models.user.findById(teacherId);
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }

      if (user.code !== code) {
        return res.status(400).json({ error: "Code is incorrect" });
      }

      const codeValidate = (date, hours) => {
        return new Date(new Date(date).setHours(date.getHours() + hours));
      };

      const updatedAt = new Date(user.updatedAt);
      const now = new Date();
      const auxDate = codeValidate(updatedAt, HOURS);
      if (now.getTime() > auxDate.getTime()) {
        return res.status(400).json({ error: "The code is not valid" });
      }

      user.active = true;
      await user.save();

      return res.status(200).json({ user });
    } catch (e) {
      return res.json({ error: e.message() });
    }
  },
};

module.exports = teacher;
