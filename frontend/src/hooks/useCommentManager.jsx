import { useContext, useMemo, useState } from "react"
import axios from "../axios"
import SystemPopupsContext from "../context/SystemPopupsContext"

const useCommentManager = (authToken) => {
    const { addPopup } = useContext(SystemPopupsContext)
    const [ comments, setComments ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState()
    const [ hasMoreComments, setHasMoreComments ] = useState(false)
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
            addPopup(error.response.data.message, "error")            
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
            addPopup(response.data.message)
        }
    catch (error) {
            addPopup(error.response.data.message, "error")
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
            addPopup(response.data.message)
        }
        catch (error) {
            addPopup(error.response.data.message, "error")
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
            addPopup(error.response.data.message, "error")
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
            addPopup("Comment deleted.")
        }
        catch (error) {
            addPopup(error.response.data.message)
        }
    }

    const editComment = async (id, content) => {
        try {
            const response = await axios.patch(`/api/comments/${id}/`, { content }, {
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                }
            })

            const updatedComment = response.data.comment
            const newComments = comments.map(comment => {
                return comment.id === id ? updatedComment : comment
            })
            setComments(newComments)
        }
        catch (error) {
            addPopup(error.response.data.message, "error")
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
        editComment,
    }
}

export default useCommentManager