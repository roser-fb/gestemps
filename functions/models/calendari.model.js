const mongoose = require('mongoose');

const calendariSchema = new mongoose.Schema({
  data_ini: String,
  data_fi: String,
  motiu: String,
  num_dies: Number,
  user: String
});
calendariSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Calendari = mongoose.model('calendari', calendariSchema);

module.exports = { Calendari };