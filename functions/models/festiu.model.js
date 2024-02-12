const mongoose = require('mongoose');

const festiuSchema = new mongoose.Schema({

  data_ini: String,
  motiu: String,
  fix: Number
});
festiuSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object._id = id;
  return object;
});
const Festiu = mongoose.model('festius', festiuSchema);

module.exports = { Festiu };