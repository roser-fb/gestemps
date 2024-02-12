const mongoose = require('mongoose');

const guardiaSchema = new mongoose.Schema({

  data: String,
  n_hores: Number,
  festiu: Number,
  motiu: Number,
  user: String
});

guardiaSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object._id = id;
  return object;
});
const Guardia = mongoose.model('guardies', guardiaSchema);

module.exports = { Guardia };