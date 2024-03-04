const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
const verifyToken = require("../config/jwt.config.js");
const secretKey = "1312@JaNoEnsAlimentenLesMolles@:@AraVolemElPaSencer@1312";
router.post("/login", async (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  try {
    const newuser = await User.findOne({ user });
    if (!newuser) {
      return res.status(400).json({ msg: "Invalid user or pwd" });
    }
    const pwdMatch = await bcrypt.compare(pwd, newuser.pwd);
    if (!pwdMatch) {
      return res.status(400).json({ msg: "Invalid user or pwd" });
    }
    const token = jwt.sign({ id: newuser._id, user: newuser.user }, secretKey, {
      expiresIn: "1w",
    });
    return res.json({
      msg: "Successfully logged in",
      user: newuser._id,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: error });
  }
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const mail = req.body.mail;
  const role = "Role.admin";
  try {
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists, please login." });
    }
    const hashedPassword = await bcrypt.hash(pwd, 10); // 10 salt rounds
    const newUser = new User({
      username,
      mail,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.json({ msg: "Successfully created user, please login" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", error: error });
  }
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
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res
        .status(401)
        .json({ status: "error", message: "Token de autorización inválido" });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const { id, username, password, mail, role } = req.body;
        const userId = req.params.id;
        const userUpdate = await User.findByIdAndUpdate(userId, {
          username,
          mail,
          password: hashedPassword,
          role,
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
