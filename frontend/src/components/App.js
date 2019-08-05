import React, { useState, useEffect } from 'react';
import '../App.css';
import blogService from '../services/blogs'
import Notification from './Notification'
import Blog from './Blog'
import Login from './Login'
import BlogAdder from './BlogAdder'
import Togglable from './Togglable'
import TogglableText from './TogglableText'

const App = (props) => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      getBlogsForUser(user);
    }
  }, []);

  const showBlogs = () => {
    console.log("SHOW BLOGS")
    if (blogs) {
      return blogs
        .sort((a, b) => {
          console.log("SORT", a, b);
          if (a.likes >= b.likes) {
            console.log("SORT RET A");
            return -1
          };
          if (a.likes < b.likes) {
            console.log("SORT RET B");
            return 1
          };
        })
        .map(b => <Blog key={b.title} pBlog={b} user={user} />);
    } else {
      return null;
    }
  }

  const getBlogsForUser = async (user) => {
    const tempBlogs = await blogService.getBlogs(user)
    console.log("TEMPBLOGS", tempBlogs);
    setBlogs(tempBlogs)
  }

  const blogAdderRef = React.createRef();

  return (
    <div>
      <Notification notification={notification} />
      <h1>Blogs</h1>
      <Togglable buttonLabel="Login">
        {user === null
          ? <Login setUser={setUser} setBlogs={setBlogs} setError={setNotification} />
          : <BlogAdder setUser={setUser} user={user} blogs={blogs} setBlogs={setBlogs} />}
      </Togglable>
      <button onClick={() => getBlogsForUser(user)}>Get blogs</button>
      <button onClick={() => setBlogs([])}>CLEAR</button>
      <div>{showBlogs()}</div>
    </div>
  );
}

export default App;
