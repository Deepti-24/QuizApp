const auth = require('../middleware/auth');
const {Question} = require('../models/questions');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/:topic', auth, async (req, res) => {
        try {
            const questions = await Question.aggregate([
                {$match: {topic: req.params.topic}},
                {$sample: {size: 15}}
              ]);;
            return res.status(200).render('test',{title: "Questions", questions: questions, topic: req.params.topic});
        } catch (error) {
            return res.status(500).json({"error":error});
        }
});

module.exports = router;