const express = require("express");
const moment = require("moment");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Festiu } = require("../models/festiu.model");
const verifyToken = require("../config/jwt.config.js");
const secretKey = require("../config/jwt.config.js");

router.get("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorizacion invalid" });
    } else {
      try {
        const results = await Festiu.find().sort({ data_ini: 1 });
        res.status(200).json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
      }
    }
  });
});

router.post("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorizacion invalid" });
    } else {
      try {
        const periode = new Festiu(req.body);
        await periode.save();
        res.status(200).json({ status: "ok" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
      }
    }
  });
});

router.delete("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorizacion invalid" });
    } else {
      try {
        const periodeId = req.params.id;
        await Festiu.findByIdAndDelete(periodeId);
        res.status(200).json({ status: "ok" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
      }
    }
  });
});

module.exports = router;
