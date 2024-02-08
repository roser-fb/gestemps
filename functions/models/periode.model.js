const mongoose = require('mongoose');

const periodeSchema = new mongoose.Schema({
  data_ini: String,
  data_fi: String,
  motiu: String,
  num_dies: Number,
  user: String
});

periodeSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Periode = mongoose.model('periodes', periodeSchema);

module.exports = { Periode };