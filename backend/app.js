const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./utils/config")
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/user")
const loginRouter = require("./controllers/login")
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

console.log("MongoDB URI:", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(response => {
        logger.info("Connection to the database established")
    })
    .catch(error => logger.error(error));

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(cors());
app.use(middleware.requestToken)
app.use("/api/blogs/", blogRouter);
app.use("/api/users/", userRouter);
app.use("/api/login/", loginRouter);
app.use(middleware.errorHandler);


module.exports = app;