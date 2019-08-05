import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {useField} from '../hooks'

const Login = ({ setUser, setBlogs, setError }) => {
    const username = useField("text", "Vippep");
    const password = useField("password", "RaStat");

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(`Logging in as ${username.value}`);
        try {
            const user = await loginService.login({ username: username.value, password: password.value });
            await setUser(user);
            console.log("USER:", user);
            await setBlogs(await blogService.getBlogs(user));
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;