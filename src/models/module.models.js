const { Schema, model } = require("mongoose");

const moduleSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Module", moduleSchema);
