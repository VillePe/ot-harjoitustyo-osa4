const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", (req, res) => {
    console.log("GET")
    Blog.find({}).then(response => {
        console.log(response);
        res.send(response);
    }).catch(error => {
        console.log(error)
        res.status(404).end();
    })
})

router.post("/", (req, res) => {
    const blogItem = new Blog({
        title: "Testi",
        author: "VP",
        url: "NOURL",
        likes: 10000
    })
    blogItem.save().then(response => {
        res.status(204);
        res.json(response.toJSON());
    }).catch(error => {
        console.log(error)
        res.status(400).end();
    })
})

module.exports = router;