const express = require("express");
const moment = require("moment");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Periode } = require("../models/periode.model");
const verifyToken = require("../config/jwt.config.js");
const secretKey = "1312@JaNoEnsAlimentenLesMolles@:@AraVolemElPaSencer@1312";

router.get("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const results = await Periode.find().sort({ data_ini: 1 });
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ status: "error" });
      }
    }
  });
});
router.get("/:year", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const year = req.params.year;
        var condition = year
          ? { data_ini: { $regex: new RegExp(year), $options: "i" } }
          : {};
        const results = await Periode.find(condition).sort({ data_ini: 1 });
        res.status(200).json(results);
      } catch (error) {
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
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const periode = new Periode(req.body);
        await periode.save();
        res.status(200).json({ status: "ok" });
      } catch (error) {
        res.status(500).json({ status: "error" });
      }
    }
  });
});

// Manejador de la ruta para eliminar un período por su ID
router.delete("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const periodeId = req.params.id;
        await Periode.findByIdAndDelete(periodeId);
        res.status(200).json({ status: "ok" });
      } catch (error) {
        res.status(500).json({ status: "error" });
      }
    }
  });
});

module.exports = router;
