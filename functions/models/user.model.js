const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  pwd: {
    type: String,
    required: true
  }
});
userSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const User = mongoose.model('users', userSchema);

module.exports = { User };