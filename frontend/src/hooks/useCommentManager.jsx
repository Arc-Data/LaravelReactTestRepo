import { useContext, useMemo, useState } from "react"
import axios from "../axios"
import NotificationContext from "../context/NotificationContext"

const useCommentManager = (authToken) => {
    const { addNotification } = useContext(NotificationContext)
    const [ comments, setComments ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState()
    const [ hasMoreComments, setHasMoreComments ] = useState(true)
    const [ currentPage, setCurrentPage ] = useState(1)

    const getComments = async (id) => {
        setLoading(true)
        try {
            const url = `/api/posts/${id}/comments?page=${currentPage}`;
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            setComments(prevComments => [...prevComments, ...response.data.data])
            
            if (response.data.links && response.data.links.next) {
                setCurrentPage(prev => prev + 1)
                setHasMoreComments(true)
            } else {
                setHasMoreComments(false)
            }
        
        }
        catch (error) {
            addNotification(error.response.data.message, "error")            
        }

        setLoading(false)
    }

    const createComment = async (id, comment) => {
        try {
            const response = await axios.post(`api/posts/${id}/comments`, comment, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setComments([...comments, response.data.comment])
            addNotification(response.data.message)
        }
    catch (error) {
            addNotification(error.response.data.message, "error")
        }
    }

    const replyComment = async (id, content) => {
        try {
            const response = await axios.post(`/api/comments/${id}/reply`, content, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            setComments([...comments, response.data.comment])
            addNotification(response.data.message)
        }
        catch (error) {
            addNotification(error.response.data.message, "error")
        }
    }

    const likeComment = async (id) => {
        try {
            await axios.post(`/api/comments/${id}/like`, null, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
        }
        catch (error) {
            addNotification(error.response.data.message, "error")
        }
    }

    const deleteComment = async (id) => {
        try {
            const response = await axios.delete(`/api/comments/${id}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            const updatedComments = comments.filter(comment => comment.id !== id)
            setComments(updatedComments)
            addNotification("Comment deleted.")
        }
        catch (error) {
            addNotification(error.response.data.message)
        }
    }


    return {
        comments,
        loading,
        status,
        getComments,
        likeComment,
        createComment,
        hasMoreComments,
        replyComment,
        deleteComment,
    }
}

export default useCommentManager