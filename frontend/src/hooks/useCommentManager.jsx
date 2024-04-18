import { useContext, useMemo, useState } from "react"
import axios from "../axios"
import NotificationContext from "../context/NotificationContext"

const useCommentManager = (authToken) => {
    const { addNotification } = useContext(NotificationContext)
    const [ comments, setComments ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState()

    const getComments = async (id) => {
        setLoading(true)

        try {
            const response = await axios(`/api/posts/${id}/comments`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            setComments(response.data.data)
        }
        catch (error) {
            addNotification("An error occured while fetching comments")            
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
            addNotification("An error occured while adding a comment.")
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


    return {
        comments,
        loading,
        status,
        getComments,
        createComment,
        replyComment,
    }
}

export default useCommentManager