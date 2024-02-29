const express = require("express");
const moment = require("moment");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Guardia } = require("../models/guardia.model.js");
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
        const results = await Guardia.find().sort({ data: 1 });
        res.status(200).json(results);
      } catch (error) {
        console.error(error);
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
          ? { data: { $regex: new RegExp(year), $options: "i" } }
          : {};

        const results = await Guardia.find(condition);
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
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const guardia = new Guardia(req.body);
        await guardia.save();
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
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const guardiaId = req.params.id;
        await Guardia.findByIdAndDelete(guardiaId);
        res.status(200).json({ status: "ok" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
      }
    }
  });
});

module.exports = router;
