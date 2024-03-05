const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: true,
  },
});
authSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Auth = mongoose.model("users", authSchema);

module.exports = { Auth };
