const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./utils/config")
const blogRouter = require("./controllers/blog")

mongoose.connect(config.MONGODB_URI)
    .then(response => {
        console.log("Connection to the database established")
    })
    .catch(error => console.log(error));

app.use(bodyParser.json());
app.use(cors());
app.use("/api/blogs/", blogRouter);


module.exports = app;