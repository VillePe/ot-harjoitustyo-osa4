import React, { useState } from "react";

const CreateUser = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form onSubmit={onSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>Username</td>
                        <td><input onChange={(event) => { setUsername(event.target.value); }} value={username} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input onChange={(event) => { setUsername(event.target.value); }} value={name} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" onChange={(event) => { setPassword(event.target.value); }} value={password} /></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Login</button>
        </form>
    );
};