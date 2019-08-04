import axios from 'axios'

const baseUrlUsers = "api/users";
const baseUrlBlogs = "api/blogs";

const getBlogs = async (credentials) => {
    if (credentials === null) return null;
    const response = await axios.get(`${baseUrlUsers}/${credentials._id}`)
    console.log("RESPONSE.DATA", response.data);
    return response.data.blogs;
}

const addBlog = async (newObject, token) => {
    console.log("Adding new blog", newObject, token)
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(baseUrlBlogs, newObject, config);
    return response.data;
}

const updateBlog = async (id, newObject, token) => {
    const config = {
        headers: {Authorization: token}
    }
    const req = axios.put(`${baseUrlBlogs}/${id}`, newObject, config);
    return req.then(response => response.data);
}

export default {getBlogs, addBlog, updateBlog};