const { Schema, model } = require("mongoose");

const buyStudentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    studentModules: [
      {
        type: Schema.Types.ObjectId,
        ref: "StudentModule",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("BuyStudent", buyStudentSchema);
