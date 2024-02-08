const express = require('express');
const moment = require('moment');
const router = express.Router();

const { Periode } = require('../models/periode.model');

router.get('/', async (req, res) => {
  try {
    const results = await Periode.find().sort({ data_ini: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});
router.get('/:year', async (req, res) => {
  try {
    const year = req.params.year;
    var condition = year ? { data_ini: { $regex: new RegExp(year), $options: "i" } } : {};
    const results = await Periode.find(condition).sort({ data_ini: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});
router.post('/', async (req, res) => {
  try {
    const periode = new Periode(req.body);
    await periode.save();
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

// Manejador de la ruta para eliminar un período por su ID
router.delete('/:id', async (req, res) => {
  try {
    const periodeId = req.params.id;
    await Periode.findByIdAndDelete(periodeId);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;
