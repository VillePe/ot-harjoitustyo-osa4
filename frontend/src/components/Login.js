import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, setBlogs, setError}) => {
    const [username, setUsername] = useState("Vippep");
    const [password, setPassword] = useState("RaStat");

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(`Logging in as ${username}`);
        try {
          const user = await loginService.login({ username: username, password: password })
          await setUser(user);    
          console.log("USER:", user)
          await setBlogs(await blogService.getBlogs(user))
          console.log("Blogs set!");
          window.localStorage.setItem("loggedUser", JSON.stringify(user));
        } catch (error) {
          setError(error.message);
          setTimeout(() => {
            setError("");
          }, 3000)
        }
      }

    return (
        <form onSubmit={onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td><input onChange={(event) => {setUsername(event.target.value);}} value={username} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input type="password"  onChange={(event) => {setPassword(event.target.value);}} value={password} /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Login</button>
        </form>
      )
}

export default Login