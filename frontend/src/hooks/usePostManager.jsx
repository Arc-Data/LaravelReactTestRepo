import { useContext, useState } from "react"
import axios from "../axios"
import SystemPopupsContext from "../context/SystemPopupsContext"

const usePostManager = (authToken) => {
    const { addPopup } = useContext(SystemPopupsContext)
    const [ post, setPost ] = useState()
    const [ posts, setPosts ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState()

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ hasMorePosts, setHasMorePosts ] = useState(false)
    const [ editedPost, setEditedPost ] = useState({
        title: '',
        description: '',
    }) 

    const createPost = async (data) => {
        try {
            const response = await axios.post('/api/posts/', data, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            addPopup(response.data.message)
        }
        catch (error) {
            addPopup(error.response.data.message, "error")
        }   
    }

    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            addPopup(response.data.message)
        }
        catch (error) {
            addPopup(error.response.data.message, "error")
        }
    }

    const likePost = async (id) => {
        try {
            await axios.post(`/api/posts/${id}/like`, null, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
        }
        catch (error) {
            addPopup(error.response.data.message,"error")
        }
    }



    const getPosts = async () => {
        setLoading(true)
        try {
            const url = `/api/posts?page=${currentPage}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            setPosts(prevPosts => [...prevPosts, ...response.data.data])
            
            if (response.data.links && response.data.links.next) {
                setCurrentPage(prev => prev + 1)
                setHasMorePosts(true)
            } else {
                setHasMorePosts(false)
            }
        }   
        catch (error) {
            addPopup(error.response.data.message, "error")
        } finally {
            setLoading(false)
        }
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
            setStatus(error.response.status)
        }


        setLoading(false)
        
    }

    const getUserPosts = async (id) => {
        setLoading(true)
        try {
            const url = `/api/user/${id}/posts?page=${currentPage}`
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }) 

            setPosts(prevPosts => [...prevPosts, ...response.data.data])
        
            if (response.data.links && response.data.links.next) {
                setCurrentPage(prev => prev + 1)
                setHasMorePosts(true)
            } else {
                setHasMorePosts(false)
            }
        }
        catch (error) {
            addPopup(error.response.data.message, "error")
        } finally {
            setLoading(false)
        }
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
            addPopup(response.data.message)
        }
        catch (error) {
            addPopup(error.response.data.message)
        }

        setLoading(false)
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
        getUserPosts,
        editPost,
        hasMorePosts,
        editedPost,
        likePost,
        handleEditedPostChange,
        cancelEdit,
    }
}

export default usePostManager