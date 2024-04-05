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

    }

    const getAllPosts = async () => {

    }

    const getPostById = async () => {

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
        getAllPosts,
        getPostById,
        editPost
    }
}

export default usePostManager