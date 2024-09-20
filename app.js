const express = require('express');
const mongoose = require("mongoose");
const app = express();
const router = express.Router();


//Turn the req.body into usable information
app.use(express.json());



module.exports = app;