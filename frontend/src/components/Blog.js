import React, { useState } from "react";
import blogService from "../services/blogs";
import { Button } from 'semantic-ui-react'

const Blog = ({ user, pBlog }) => {
    const [blog, setBlog] = useState(pBlog);
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    if (blog === undefined || blog === null) return null;
    console.log("Blog in component:", blog);

    const buttonStyle = {
        marginLeft: "20px"
    };

    const deleteBlog = async (event) => {
        console.log(event.target.id);
        const response = await blogService.deleteBlog(event.target.id, user.token);
        console.log(response);
        setBlog(null);
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const addLike = () => {
        const likedBlog = {
            ...blog,
            likes: blog.likes + 1
        };
        console.log(likedBlog);
        blogService.updateBlog(blog._id, likedBlog, user.token).then(response => setBlog(response));
    };

    const getBlog = () => {
        if (blog === null) return null;
        return (
            <div className="blog">
                <h1 style={{ cursor: "pointer" }} onClick={toggleVisibility}>{blog.title} - {blog.author}<Button style={buttonStyle} id={blog._id} onClick={deleteBlog}>Poista</Button></h1>
                <div style={showWhenVisible}>
                    <a href={blog.url}>{blog.url}</a>
                    <div>
                        <Button
                            color="red"
                            icon="heart"
                            content="like"
                            label={{ basic: true, color: 'red', pointing: 'left', content: blog.likes.toString() }}
                            onClick={addLike}
                        >
                       </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {getBlog()}
        </div>
    );
};

export default Blog;