const mongoose = require('mongoose');

const fitxarSchema = new mongoose.Schema({

  data_ini: String,
  data_fi: String,
  temps: Number,
  user: String
});

fitxarSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object._id = _id;
  return object;
});
const Fitxa = mongoose.model('fitxes', fitxarSchema);

module.exports = { Fitxa };