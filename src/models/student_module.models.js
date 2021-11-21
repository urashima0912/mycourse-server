const { Schema, model } = require("mongoose");

const studentModuleSchema = new Schema(
  {
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    studentQuestions: [
      {
        type: Schema.Types.ObjectId,
        ref: "StudentQuestion",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("StudentModule", studentModuleSchema);
