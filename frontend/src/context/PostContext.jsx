import { createContext, useContext, useEffect, useMemo, useState } from "react";
import usePostManager from "../hooks/usePostManager";
import { useParams } from "react-router-dom";
import AuthContext from "./AuthContext";
import useCommentManager from "../hooks/useCommentManager";

const PostContext = createContext()

export default PostContext;

export const PostProvider = ({children}) => {
    const { id } = useParams()
    const { authToken } = useContext(AuthContext)
    const { 
        post, 
        loading, 
        getPost, 
        editedPost, 
        editPost, 
        handleEditedPostChange 
    } = usePostManager(authToken)
    const { comments, loading:commentsLoading, getComments, createComment } = useCommentManager(authToken)
    
    const getCommentsById = useMemo(() => {
        const group = {}
        comments.forEach(comment => {
            group[comment.parent_comment] ||= []
            group[comment.parent_comment].push(comment)
        })
        return group
    }, [comments])

    const getReplies = (id) => {
        return getCommentsById[id]
    }

    const addLocalComment = async (content) => {
        const submittedComment = content.trim()
        if (!submittedComment) return;
        await createComment(id, submittedComment)
    }

    useEffect(() => {
        getPost(id)
    }, [id])

    useEffect(() => {
        if (!post) return
        getComments(id) 
    }, [post])

    const contextData = {
        post, 
        rootComments: getCommentsById[null],
        getReplies,
        addLocalComment,
        commentsLoading,
        editPost,
        editedPost,
        handleEditedPostChange,
    }

    return (
        <PostContext.Provider value={contextData}>
            {loading ? null : children}
        </PostContext.Provider>
    )
}