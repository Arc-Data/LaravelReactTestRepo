import { useContext, useState } from "react"
import axios from "../axios"
import NotificationContext from "../context/NotificationContext"

const usePostManager = (authToken) => {
    const { addNotification } = useContext(NotificationContext)
    const [post, setPost] = useState()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState()
    const [editedPost, setEditedPost] = useState({
        title: '',
        description: '',
    }) 
    const [meta, setMeta] = useState()
    const [links, setLinks] = useState()

    const createPost = async (data) => {
        try {
            const response = await axios.post('/api/posts/', data, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            addNotification(response.data.message)
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

            addNotification(response.data.message)
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

            const postData =  response.data.data

            setPost(postData)
            setEditedPost(postData)
        }
        catch (error) {
            console.log("An error occured while retrieving specific post", error)
        }


        setLoading(false)
        
    }

    const getUserPosts = async (id) => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/user/${id}/posts`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }) 

            setPosts(response.data.data)
            setMeta(response.data.meta)
            setLinks(response.data.links)
        }
        catch (error) {
            console.log("An error occured while fetching user posts. ", error)
        }
        setLoading(false)
    }

    const handleEditedPostChange = (e) => {
        const { name, value } = e.target

        setEditedPost(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const cancelEdit = (e) => {
        setEditedPost({
            title: post.title, 
            description: post.description
        })
    }

    const editPost = async (id, data) => {
        setLoading(true)

        console.log(data.description)
        console.log(data)

        try {
            const response = await axios.patch(`/api/posts/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            setPost(prevData => ({
                ...prevData,
                'title': data.title,
                'description': data.description
            }))

            setEditedPost(data)
            addNotification(response.data.message)
        }
        catch (error) {
            // can i still log the details of response.data.message in here in case the fetch goes wrong?
            console.log('An error occurede while updating post ', error)
        }

        setLoading(false)
    }
    
    return {
        post,
        posts,
        links,
        meta,
        loading,
        status,
        createPost,
        deletePost,
        getPosts,
        getPost,
        getUserPosts,
        editPost,
        editedPost,
        handleEditedPostChange,
        cancelEdit,
    }
}

export default usePostManager