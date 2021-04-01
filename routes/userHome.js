const auth = require('../middleware/auth');
const Joi = require('joi');
// const bcrypt = require('bcrypt');
const {User} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    res.render("userHome", { title: "Dashboard", userName: user.name});
  });

module.exports = router;