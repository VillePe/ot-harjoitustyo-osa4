import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogAdder = ({user, blogs, setBlogs, setUser}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState(user.name);
    const [url, setUrl] = useState("http://www.");

    const onSubmit = async (event) => {
        event.preventDefault();
        const newBlog = {
            title: title,
            author: author,
            url: url,
            likes:0
        }
        console.log("Adding blog...", user, newBlog)
        const resultBlog = await blogService.addBlog(newBlog, user.token);
        console.log("Result blog:", resultBlog);
        setBlogs(blogs.concat(resultBlog));
    }
    const style = {
        width: 500
    }

    const logOut = () => {
        window.localStorage.removeItem("loggedUser");
        setUser(null);
        setBlogs([]);
    }

    return (
        
        <form onSubmit={(onSubmit)}>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td><input style={style} onChange={(event) => {setTitle(event.target.value)}} /></td>
              </tr>
              <tr>
                <td>Author</td>
                <td ><input style={style} onChange={(event) => {setAuthor(event.target.value)}} value={author} /></td>
              </tr>
              <tr>
                <td>URL</td>
                <td ><input style={style} onChange={(event) => {setUrl(event.target.value)}} value={url} /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Add</button>
          <button type="button" onClick={logOut}>Log out</button>
        </form>
      )
}

export default BlogAdder