const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect('mongodb://localhost:27017/forum', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const users = require("./users.js");
app.use("/api/users", users.routes);

const thread = require("./thread.js");
app.use("/api/thread", thread.routes);

const comment = require("./comment.js");
app.use("/api/comment", comment.routes);

app.listen(3003, () => console.log('Server listening on port 3003'));
