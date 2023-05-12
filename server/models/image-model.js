const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorValidator = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);

const imageKey = new Schema(
  {
    key: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", imageKey);
// name: { type: String, required: true },
//     color: {
//       type: String,
//       validator: [colorValidator, "Invalid color"],
//       required: true,
//     },