import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import usePostManager from "../hooks/usePostManager"
import Spinner from "../components/Spinner"

const PostDetail = () => {
    const { id } = useParams()
    const { authTokens } = useContext(AuthContext)
    const { post, loading, getPost } = usePostManager(authTokens)

    useEffect(() => {
        const retrievePost = async () => {
            await getPost(id) 
        }

        retrievePost()
    }, [id])

    if (loading) {
        return (<Spinner />)
    }

    return (
        <div className="p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 ">PostDetail</div>
    )
}

export default PostDetail