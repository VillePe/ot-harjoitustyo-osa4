import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
    if (blog === undefined || blog === null) return null;
    console.log("Blog in component:", blog)

    const buttonStyle = {
        marginLeft:"20px"
    }

    const deleteBlog = () => {
        
    }

    return (
        <div>
            <div>
                <h1>{blog.title} - {blog.author}<button style={buttonStyle} >Poista</button></h1>
                
            </div>
            <a href={blog.url}>{blog.url}</a>
            <div>Likes: {blog.likes.toString()}</div>
        </div>
    )
}

export default Blog;