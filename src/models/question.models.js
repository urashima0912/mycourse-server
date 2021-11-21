const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    response: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Question", questionSchema);
