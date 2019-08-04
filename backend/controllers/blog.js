const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    logger.info("GET")
    Blog.find({})
        .populate({ path: "userId", select: { name: 1 } })
        .then(response => {
            // logger.info(response);
            res.send(response);
        }).catch(error => {
            logger.info(error)
            res.status(404).end();
        })
})

router.get("/:_id", (req, res, next) => {
    Blog.findById(req.params._id)
        .then(response => {
            logger.info(response);
            res.json(response.toJSON());
        })
        .catch(error => next(error));
})

router.post("/", async (req, res, next) => {
    logger.info("POST");
    const token = req.token
    logger.info("TOKEN:", token);

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        logger.info(decodedToken)
        if (!token || !decodedToken._id) {
            return res.status(401).json({error: "Token missing or invalid"});
        }

        const user = await User.findById(decodedToken._id);
        const blogItem = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: req.body.likes,
            userId: user._id
        })

        const newBlogItem = await blogItem.save();
        user.blogs = user.blogs.concat(newBlogItem._id);
        await user.save();
        res.status(204).json(newBlogItem.toJSON());
    } catch (error) {
        logger.error("Error while posting a blog")
        next(error);
    }
})

router.delete("/:_id", async (req, res, next) => {
    const _id = req.params._id;
    logger.info("Deleting item with id:", _id);
    const token = req.token
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        logger.info(decodedToken)
        if (!token || !decodedToken._id) {
            return res.status(401).json({error: "Token missing or invalid"});
        }
        await Blog.findByIdAndDelete({ _id: _id });
        res.status(204).end();
        logger.info("Item deleted");
    } catch (error) {
        logger.info("Error while deleting item", error.message);
        res.status(204).end();
    }
})

router.put("/:_id", async (req, res, next) => {
    const body = req.body;
    const _id = req.params._id;
    const blog = new Blog({
        _id: _id,
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes
    })
    try {
        const response = await Blog.findByIdAndUpdate({ _id: _id }, blog, { new: true })
        res.json(response.toJSON());
    } catch (error) {
        next(error);
    }

})

module.exports = router;