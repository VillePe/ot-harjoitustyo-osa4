import React, { useState, useEffect } from "react";
import "../App.css";
import blogService from "../services/blogs";
import Notification from "./Notification";
import Login from "./Login";
import BlogAdder from "./BlogAdder";
import { init, clear, setUser } from "../reducers/mainReducer";
import Menu from './Menu'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import BlogsList from "./BlogsList";
import { Container, Button } from "semantic-ui-react";

const App = (props) => {
    console.log("APP PROPS:", props)
    const store = props.store;
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser");
        console.log("Logged user:", loggedUserJSON);
        if (loggedUserJSON) {
            console.log("A logged user found!")
            const user = JSON.parse(loggedUserJSON);
            store.dispatch(setUser(user));
            getBlogsForUser(user);
        }
    }, []);

    const getBlogsForUser = async (user) => {
        const tempBlogs = await blogService.getBlogs(user);
        console.log("TEMPBLOGS", tempBlogs);
        store.dispatch(init(tempBlogs));
    };

    const user = store.getState().user;

    console.log("USER", user);

    return (
        <Container>
            <Router>
                <Notification notification={notification} />
                {user === null ? null : <Menu store={store} />}
                <h1>Blogs</h1>
                {user === null
                    ? <Login store={store} setError={setNotification} />
                    : <Redirect to="/blogs" />}
                <Route exact path="/create" render={() => <BlogAdder store={store} />} />
                <Button style={{margin:"2px"}} onClick={() => getBlogsForUser(user)}>Get blogs</Button>
                <Button style={{margin:"2px"}} onClick={() => store.dispatch(clear())}>CLEAR</Button>
                <Route exact path="/blogs" render={() => user === null ? null : <BlogsList store={store} />} />
            </Router>
        </Container>
    );
};

export default App;
