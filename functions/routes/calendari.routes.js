const express = require('express');
const router = express.Router();

const { Guardia } = require('../models/guardia.model');
const { Festiu } = require('../models/festiu.model');
const { Periode } = require('../models/periode.model');

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const periodes = await Periode.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'motius',
          localField: 'motiu',
          foreignField: 'motiu_id',
          as: 'motiu'
        }
      },
      {
        $project: {
          id: { $toString: '$_id' },
          title: '$motiu.motiu_desc',
          start: '$data_ini',
          end: '$data_fi',
        }
      }
    ]);

    const festius = await Festiu.aggregate([
      {
        $lookup: {
          from: 'motius',
          localField: 'motiu',
          foreignField: 'motiu_id',
          as: 'motiu'
        }
      },
      {
        $project: {
          id: { $toString: '$_id' },
          title: '$motiu.motiu_desc',
          start: '$data_ini',
          end: '$data_ini',
        }
      }
    ]);

    const guardies = await Guardia.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'motius',
          localField: 'motiu',
          foreignField: 'motiu_id',
          as: 'motiu'
        }
      },
      {
        $project: {
          id: { $toString: '$_id' },
          title: '$motiu.motiu_desc',
          start: '$data',
          end: '$data',
        }
      }
    ]);

    const events = [...periodes, ...festius, ...guardies];

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;
