const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
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
    return res.status(500).json({
      status: error,
      user: newuser,
    });
  }
});

module.exports = router;
