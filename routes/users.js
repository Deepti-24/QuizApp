
const bcrypt = require('bcrypt');
const {User,validate} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("register", { title: "Register"});
    });  

router.post('/',async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email : req.body.email });
    if(user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt =  await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.redirect('/auth');
});

module.exports = router;