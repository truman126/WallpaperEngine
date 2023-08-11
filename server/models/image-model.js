const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorValidator = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);

const imageKey = new Schema(
  {
    key: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    url:{
      type: String,
      required: false
    },
    name:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ImageKey", imageKey);
