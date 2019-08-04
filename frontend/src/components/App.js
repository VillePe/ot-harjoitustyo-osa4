import React, { useState, useEffect } from 'react';
import '../App.css';
import blogService from '../services/blogs'
import Notification from './Notification'
import Blog from './Blog'
import Login from './Login'
import BlogAdder from './BlogAdder'

const App = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const showBlogs = () => {
    console.log("SHOW BLOGS")
    if (blogs) {
      return blogs.map(b => <Blog key={b.title} blog={b} />);
    } else {
      return null;
    }
  }

  return (
    <div>
      <Notification message={error} />
      <h1>Blogs</h1>
      {user === null
        ? <Login setUser={setUser} setBlogs={setBlogs} setError={setError} />
        : <BlogAdder setUser={setUser} user={user} setBlogs={setBlogs} />}
      <button onClick={async () => {
        const tempBlogs = await blogService.getBlogs(user)
        console.log("TEMPBLOGS", tempBlogs);
        setBlogs(tempBlogs)
      }}>Get blogs</button>
      <button onClick={() => setBlogs([])}>CLEAR</button>
      <div>{showBlogs()}</div>
    </div>
  );
}

export default App;
