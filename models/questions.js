
const mongoose = require('mongoose');

const Question = mongoose.model('Question',new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    options:{
        A: {type: String, required: true},
        B: {type: String, required: true},
        C: {type: String},
        D: {type: String},
        E: {type: String}
    },
    answer:{
        type: String,
        required: true,
        maxlength: 1
    },
    topic:{
        type: String,
        required: true
    }
}));

exports.Question = Question;