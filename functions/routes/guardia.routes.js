const express = require('express');
const moment = require('moment');
const router = express.Router();

const { Guardia } = require('../models/guardia.model.js');

router.get('/', async (req, res) => {
  try {
    const results = await Guardia.find().sort({ data: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.get('/:year', async (req, res) => {
  try {
    const year = req.params.year;
    var condition = year ? { data: { $regex: new RegExp(year), $options: "i" } } : {};

    const results = await Guardia.find(condition);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const guardia = new Guardia(req.body);
    await guardia.save();
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const guardiaId = req.params.id;
    await Guardia.findByIdAndDelete(guardiaId);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;