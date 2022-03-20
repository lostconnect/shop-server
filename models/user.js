const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
  },
});

module.exports = mongoose.model("user", userShema);
