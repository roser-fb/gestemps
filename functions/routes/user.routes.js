const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
const verifyToken = require("../config/jwt.config.js");
const secretKey = "1312@JaNoEnsAlimentenLesMolles@:@AraVolemElPaSencer@1312";

router.post("/register", verifyToken, async (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;
  const mail = req.body.mail;
  const role = req.body.role;
  const img = req.body.img;
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const existingUser = await User.findOne({ user });
        if (existingUser) {
          return res
            .status(400)
            .json({ msg: "User already exists, please login." });
        }
        const hashedPassword = await bcrypt.hash(pwd, 10); // 10 salt rounds
        const newUser = new User({
          user,
          mail,
          pwd: hashedPassword,
          role,
          img,
        });
        await newUser.save();
        return res.json({ msg: "Successfully created user, please login" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", error: error });
      }
    }
  });
});

router.get("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const results = await User.find();
        res.status(200).json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: error });
      }
    }
  });
});

router.put("/:id", verifyToken, async (req, res) => {
  const hashedPasswordPattern = /^\$2a\$10\$/;
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const { id, username, password, mail, role, img } = req.body;
        let hashedPassword = password;
        if (!hashedPasswordPattern.test(password)) {
          hashedPassword = await bcrypt.hash(password, 10);
        }
        const userId = req.params.id;
        const userUpdate = await User.findByIdAndUpdate(userId, {
          user: username,
          mail,
          pwd: hashedPassword,
          role,
          img,
        });
        res.status(200).json(userUpdate);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: error });
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
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ status: "ok" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
      }
    }
  });
});
module.exports = router;
