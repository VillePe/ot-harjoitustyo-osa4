const bcrypt = require("bcrypt")
const router = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

router.get("/", async (req, res, next) => {
    User.find({})
        .populate({ path: "blogs", model: Blog, select: { title: 1, url: 1, likes: 1 } })
        .then(users => {
            if (users) {
                logger.info(users)
                res.json(users);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => {
            logger.error("404 users not found");
            next(error);
        });
})

router.get("/:_id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params._id).populate("blogs")
        if (user) {
            res.json(user.toJSON());
        } else {
            res.status(404).json({error: "No users found with given id"})
        }
    } catch (error) {
        next(error)
    }

})

router.post("/", async (req, res, next) => {
    const body = req.body;
    const saltrounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltrounds);
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
        blogs: []
    })
    logger.info("POST", user.username, user.name);
    user.save()
        .then(response => {
            res.json(response.toJSON());
        })
        .catch(error => next(error));
})

module.exports = router;