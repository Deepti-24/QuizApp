const auth = require('../middleware/auth');
const {Question} = require('../models/questions');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/:topic/:page', auth, async (req, res) => {
        try {
            const questions = await Question.find({topic: req.params.topic}).sort({question: 1}).skip(10*(req.params.page-1)).limit(10);
            return res.status(200).render('questions',{title: "Questions", questions: questions, topic: req.params.topic, curPage: req.params.page});
        } catch (error) {
            return res.status(500).json({"error":error});
        }
});

module.exports = router;