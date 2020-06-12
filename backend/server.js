const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

// env config
require("dotenv").config();

// app config
const app = express();
app.use(cors());
app.use(express.json());

// db config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// connection setup
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connected..");
});

// route
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(5000, () => {
    console.log("Server running on port: " + 5000);
});
