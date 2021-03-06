const logger = require("../utils/logger");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/", async (req, res, next) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    const userForToken = {
        username: user.username,
        _id: user._id
    };

    try {

        const token = jwt.sign(userForToken, process.env.SECRET);

        res.status(200).send({ token: `bearer ${token}`, username: user.username, name: user.name, _id: user._id });
    } catch (error) {
        next(error);
    }

});

module.exports = router;