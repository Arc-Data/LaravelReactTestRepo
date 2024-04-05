import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import axios from "../axios"

const usePostManager = (authToken) => {
    const [post, setPost] = useState()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState()

    const createPost = async (data) => {
        try {
            const response = await axios.post('/api/posts/', data, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            console.log(response.data)
        }
        catch (error) {
            console.log("An error occured while creating post. ", error)
        }   
    }

    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            console.log(response)
        }
        catch (error) {
            console.log("An error occured while deleting post. ", error)
        }
    }

    const getPosts = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/posts/', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            console.log(response.data)
            setPosts(response.data.data)
        }   
        catch (error) {
            console.log("An error occured while retrieving posts", error)
        }
        setLoading(false)
    }

    const getPost = async (id) => {
        setLoading(true)

        try {
            const response = await axios.get(`/api/posts/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            setPost(response.data.data)
        }
        catch (error) {
            console.log("An error occured while retrieving specific post", error)
        }

        setLoading(false)
    }

    const editPost = async () => {

    }
    
    return {
        post,
        posts,
        loading,
        status,
        createPost,
        deletePost,
        getPosts,
        getPost,
        editPost
    }
}

export default usePostManager