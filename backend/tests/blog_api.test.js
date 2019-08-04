const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

describe("Blog posts tests", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});

        const blogObjects = initialBlogs.map(b => new Blog(b));
        const promiseArray = blogObjects.map(b => b.save());
        await Promise.all(promiseArray);
    })

    test("Notes are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("There are six blogs", async () => {
        const response = await api.get("/api/blogs/");
        expect(response.body.length).toBe(initialBlogs.length);
    });

    test("The first blog is about React patterns", async () => {
        const response = await api.get("/api/blogs/");
        expect(response.body[0].title).toBe(initialBlogs[0].title);
    });

    test("A specific blog is within the returned items", async () => {
        const response = await api.get("/api/blogs/");
        const titles = response.body.map(b => b.title);
        expect(titles).toContain("Go To Statement Considered Harmful")
    });

    test("An item is deleted", async () => {
        let response = await api.get("/api/blogs");
        const _id = response.body[2]._id
        console.log("An item is deleted _id:", _id);
        await api.delete(`/api/blogs/${_id}`)
        response = await api.get("/api/blogs");
        expect(response.body.length).toBe(5);
    })

    test("An item is modified", async () => {
        let response = await api.get("/api/blogs");
        const _id = response.body[2]._id
        const modBlog = { ...response.body[2], likes: 99 }
        await api.put(`/api/blogs/${_id}`).send(modBlog);
        response = await api.get("/api/blogs");
        expect(response.body[2].likes).toBe(99);
    })

    test("A valid blog is inserted", async () => {
        const blog = new Blog({
            title: "Valid blog title",
            author: "Valid author",
            url: "http://www.ValidUrl.gg/",
            likes: 999
        })
        await blog.save();
        const response = await api.get("/api/blogs");
        expect(response.body.length).toBe(initialBlogs.length + 1);
    });

    test("An invalid blog is not inserted", async () => {
        const blog = new Blog({
            title: "",
            author: "Valid author",
            url: "http://www.ValidUrl.gg/",
            likes: 999
        })
        await blog.save().catch(() => console.log(""));
        const response = await api.get("/api/blogs");
        expect(response.body.length).toBe(initialBlogs.length);
    });
})

describe("User tests", () => {
    beforeEach(async () => {
        await User.deleteMany();
    })

    test("New user is added", async () => {
        const user = { username: "TestUsername", name: "TestUser", password: "sekret" }
        await api
            .post("/api/users/")
            .send(user)
            .expect(200)
            .expect("Content-Type", /application\/json/)
        const users = await api.get("/api/users/");
        expect(users.body.length).toBe(1);
    })
})

afterAll(() => {
    console.log("Closing mongoose connection");
    mongoose.connection.close();
})

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }
]