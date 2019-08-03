const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = blogs.reduce((result, item) => {
        return result + item.likes;        
    }, 0)
    return blogs.length === 0 ? 0 : likes;
}

const favoriteBlog = (blogs) => {
    let favorite = undefined;
    if (blogs.length === 0) return undefined;
    favorite = blogs[0];
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > favorite.likes) {
            favorite = blogs[i];
        }
    }
    return favorite;
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined;
    let writers = [];
    blogs.forEach(b => {
        const writer = writers.find(w => w.author === b.author)
        if (writer) {
            writer.blogs += 1;            
        } else {
            writers.push({author: b.author, blogs: 1});
        }
    })
    let mostBlogs = writers[0];
    for (let i = 0; i < writers.length; i++) {
        if (writers[i].blogs > mostBlogs.blogs) {
            mostBlogs = writers[i];
        }
    }
    return mostBlogs;
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined;
    let writers = [];
    blogs.forEach(b => {
        const writer = writers.find(w => w.author === b.author)
        if (writer) {
            writer.likes += b.likes;            
        } else {
            writers.push({author: b.author, likes: b.likes});
        }
    })
    let mostLikes = writers[0];
    for (let i = 0; i < writers.length; i++) {
        if (writers[i].likes > mostLikes.likes) {
            mostLikes = writers[i];
        }
    }
    return mostLikes;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}