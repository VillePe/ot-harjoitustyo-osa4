import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useField } from '../hooks'
import { init, setUser } from '../reducers/mainReducer'
import { Button } from "semantic-ui-react";

const Login = ({ store, setError }) => {
    const username = useField("text", "Vippep");
    const password = useField("password", "RaStat");

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(`Logging in as ${username.value}`);
        try {
            const user = await loginService.login({ username: username.value, password: password.value });            
            store.dispatch(setUser(user))
            console.log("USER:", user);
            (async () => {
                const tempBlogs = await blogService.getBlogs(user);
                store.dispatch(init(tempBlogs));
            })();
            console.log("Blogs set!");
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
        } catch (error) {
            setError({ message: error.message });
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>Username</td>
                        <td><input {...username} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input {...password} /></td>
                    </tr>
                </tbody>
            </table>
            <Button style={{margin:"2px"}} primary type="submit">Login</Button>
        </form>
    );
};

export default Login;