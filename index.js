
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const questions = require('./routes/questions');
const userHome = require('./routes/userHome');
const test = require('./routes/test');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

if(!config.get('SecretKey')){
  process.exit(1);
};

mongoose.connect('mongodb://localhost/quiz_app',{ useNewUrlParser: true})
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

app.use('/userHome', userHome);
app.use('/users', users);
app.use('/auth', auth);
app.use('/questions', questions);
app.use('/test', test);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});