const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passwordComplexity = require('joi-password-complexity');

const complexityOptions = {
    min: 8,
    max: 50,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, config.get('SecretKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const userSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().required().email(),
        password: new passwordComplexity(complexityOptions)
    });

    const result = Joi.validate(user, userSchema);
    return result;
}

exports.User = User;
exports.validate = validateUser;