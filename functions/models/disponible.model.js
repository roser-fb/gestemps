const mongoose = require("mongoose");

const disponibleSchema = new mongoose.Schema({
  data_ini: String,
  motiu: Number,
  user: String,
});

disponibleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Disponible = mongoose.model("disponibles", disponibleSchema);

module.exports = { Disponible };
