const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
userSchema.method("toJSON", function () {
  const { __v, _id, user, pwd, ...object } = this.toObject();
  object.id = _id;
  object.username = user;
  object.password = pwd;
  return object;
});
const User = mongoose.model("users", userSchema);

module.exports = { User };
