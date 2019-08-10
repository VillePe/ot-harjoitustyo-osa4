import React from 'react'
import Blog from "./Blog"

const BlogsList = ({ store }) => {
    const getBlogComponents = () => {
        console.log("SHOW BLOGS");
        const { blogs, user } = store.getState();
        if (blogs) {
            return blogs
                .sort((a, b) => {
                    console.log("SORT", a, b);
                    if (a.likes >= b.likes) {
                        console.log("SORT RET A");
                        return -1;
                    }
                    if (a.likes < b.likes) {
                        console.log("SORT RET B");
                        return 1;
                    }
                })
                .map(b => <Blog key={b.title} pBlog={b} user={user} />);
        } else {
            return null;
        }
    }

    return (
        <div>
            {getBlogComponents()}
        </div>
    )

}

export default BlogsList