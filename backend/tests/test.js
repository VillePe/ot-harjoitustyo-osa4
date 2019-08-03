const listHelper = require("../utils/list_helper")

const manyBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

describe("List Helper", () => {
    test("Dummy returns one", () => {
        const blogs = [];
        expect(listHelper.dummy(blogs)).toBe(1);
    })
})

describe("Total likes", () => {
    test("Of empty list is zero", () => {
        const blogs = [];
        expect(listHelper.totalLikes(blogs)).toBe(0);
    })
    test("When list has only one blog equals the likes of that", () => {
        const blogs = [{ title: "Testi", author: "TestiAuthori", url: "EIOO", likes: 100 }];
        expect(listHelper.totalLikes(blogs)).toBe(100);
    })
    test("Of a bigger list is calculated right", () => {
        const blogs = [
            { title: "Testi", author: "TestiAuthori", url: "EIOO", likes: 100 },
            { title: "Testi1", author: "TestiAuthori1", url: "EIOO", likes: 101 },
            { title: "Testi2", author: "TestiAuthori2", url: "EIOO", likes: 102 },
            { title: "Testi3", author: "TestiAuthori3", url: "EIOO", likes: 103 }
        ];
        expect(listHelper.totalLikes(blogs)).toBe(406);
    })
})

describe("Favorite", () => {
    test("Of empty list is undefined", () => {
        const blogs = [];
        expect(listHelper.favoriteBlog(blogs)).toEqual(undefined);
    })

    test("Of list with one blog", () => {
        const blogs = [{ title: "Testi", author: "TestiAuthori", url: "EIOO", likes: 100 }];
        expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0]);
    })

    test("Of a bigger list the favorite is", () => {
        // const blogs = [
        //     { title: "Testi", author: "TestiAuthori", url: "EIOO", likes: 100 },
        //     { title: "Testi1", author: "TestiAuthori1", url: "EIOO", likes: 105 },
        //     { title: "Testi2", author: "TestiAuthori2", url: "EIOO", likes: 102 },
        //     { title: "Testi3", author: "TestiAuthori3", url: "EIOO", likes: 103 },
        //     { title: "Testi4", author: "TestiAuthori3", url: "EIOO", likes: 104 },
        //     { title: "Testi5", author: "TestiAuthori3", url: "EIOO", likes: 105 }
        // ];
        expect(listHelper.favoriteBlog(manyBlogs)).toEqual(manyBlogs[2]);
    })
})

describe("Most blogs", () => {
    test("Of empty list is undefined", () => {
        const blogs = [];
        expect(listHelper.mostBlogs(blogs)).toEqual(undefined);
    })

    test("Of many most blogs has Robert C. Martin", () => {
        expect(listHelper.mostBlogs(manyBlogs)).toEqual({author: "Robert C. Martin", blogs:3});
    })
})

describe("Most likes", () => {
    test("Of empty list is undefined", () => {
        const blogs = [];
        expect(listHelper.mostLikes(blogs)).toEqual(undefined);
    })

    test("Of many most likes has Edsger W. Dijkstra", () => {
        expect(listHelper.mostLikes(manyBlogs)).toEqual({author: "Edsger W. Dijkstra", likes:17});
    })
})