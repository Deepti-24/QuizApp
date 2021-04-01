const auth = require('../middleware/auth');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var ls = require('local-storage');

router.get("/", (req, res) => {
    res.render("login", { title: "Login"});
  });

router.post('/',async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email : req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password); 
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    
    // res.header('x-auth-token', token).redirect('/userHome/me');
    ls.set('token', token);
    res.redirect('/userHome');
});

router.get('/logout', async(req,res)=>{
    ls.clear();
    res.render("index", { title: "Home" });
});

function validate(req){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(50).required()
    }

    const result = Joi.validate(req, schema);
    return result;
}

module.exports = router;