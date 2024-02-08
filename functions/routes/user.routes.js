const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model.js');

router.post("/login", async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const newuser = await User.findOne({ user });
    if (!newuser) {
      return res.status(400).json({ msg: "Invalid user or pwd" });
    }
    const pwdMatch = await bcrypt.compare(pwd, newuser.pwd);
    if (!pwdMatch) {
      return res.status(400).json({ msg: "Invalid user or pwd" });
    }
    const token = jwt.sign({ user: newuser.user }, newuser.pwd);
    return res.json({
      msg: "Successfully logged in",
      user: newuser._id,
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error' });
  }
});

router.post("/register", async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists, please login." });
    }
    const hashedPassword = await bcrypt.hash(pwd, 10); // 10 salt rounds
    const newUser = new User({ user, pwd: hashedPassword });
    await newUser.save();
    return res.json({ msg: "Successfully created user, please login" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error' });
  }
});

module.exports = router;