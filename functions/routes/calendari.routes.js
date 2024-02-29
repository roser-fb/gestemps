const express = require("express");
const router = express.Router();

const { Guardia } = require("../models/guardia.model");
const { Festiu } = require("../models/festiu.model");
const { Periode } = require("../models/periode.model");
const verifyToken = require("../config/jwt.config.js");
const secretKey = require("../config/jwt.config.js");
const jwt = require("jsonwebtoken");
router.get("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const userId = req.params.id;
        const periodes = await Periode.aggregate([
          { $match: { user: userId } },
          {
            $lookup: {
              from: "motius",
              localField: "motiu",
              foreignField: "motiu_id",
              as: "motiu",
            },
          },
          {
            $project: {
              title: "$motiu.motiu_desc",
              start: "$data_ini",
              end: "$data_fi",
            },
          },
        ]);

        const festius = await Festiu.aggregate([
          {
            $lookup: {
              from: "motius",
              localField: "motiu",
              foreignField: "motiu_id",
              as: "motiu",
            },
          },
          {
            $project: {
              title: "$motiu.motiu_desc",
              start: "$data_ini",
              end: "$data_ini",
            },
          },
        ]);

        const guardies = await Guardia.aggregate([
          { $match: { user: userId } },
          {
            $lookup: {
              from: "motius",
              localField: "motiu",
              foreignField: "motiu_id",
              as: "motiu",
            },
          },
          {
            $project: {
              title: "$motiu.motiu_desc",
              start: "$data",
              end: "$data",
            },
          },
        ]);

        const events = [...periodes, ...festius, ...guardies];

        res.status(200).json(events);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
      }
    }
  });
});

module.exports = router;
