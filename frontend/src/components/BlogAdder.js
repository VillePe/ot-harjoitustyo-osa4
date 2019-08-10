import React, {useState} from "react";
import blogService from "../services/blogs";
import {init, clear, logoutUser} from "../reducers/mainReducer"
import { Button } from "semantic-ui-react";

const BlogAdder = ({store}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState(store.getState().user.name);
    const [url, setUrl] = useState("http://www.");

    const onSubmit = async (event) => {
        event.preventDefault();
        const newBlog = {
            title: title,
            author: author,
            url: url,
            likes: 0
        };
        const user = store.getState().user;
        console.log("Adding blog...", user, newBlog);
        const resultBlog = await blogService.addBlog(newBlog, user.token);
        console.log("Result blog:", resultBlog);
        const blogs = store.getState().blogs;
        store.dispatch(init(blogs.concat(resultBlog)));
    };
    const style = {
        width: 500
    };

    const logOut = () => {
        window.localStorage.removeItem("loggedUser");
        store.dispatch(logoutUser());
        store.dispatch(clear());
    };

    return (

        <form onSubmit={(onSubmit)}>
            <table>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td><input style={style} onChange={(event) => { setTitle(event.target.value); }} /></td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td ><input style={style} onChange={(event) => { setAuthor(event.target.value); }} value={author} /></td>
                    </tr>
                    <tr>
                        <td>URL</td>
                        <td ><input style={style} onChange={(event) => { setUrl(event.target.value); }} value={url} /></td>
                    </tr>
                </tbody>
            </table>
            <Button style={{margin:"2px"}} type="submit">Add</Button>
            <Button style={{margin:"2px"}} type="button" onClick={logOut}>Log out</Button>
        </form>
    );
};

export default BlogAdder;