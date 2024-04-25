import { useContext, useState } from "react"
import PostContext from "../context/PostContext"
import { Link } from "react-router-dom"
import dayjs from "../utils/dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faFlag, faMessage, faPencil, faRetweet, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons"
import useCommentManager from "../hooks/useCommentManager"
import AuthContext from "../context/AuthContext"

const Comment = ({ comment }) => {
    const { user, authToken } = useContext(AuthContext)
    const { getReplies, replyLocalComment, deleteLocalComment, editLocalComment } = useContext(PostContext)
    const [ isLiked, setIsLiked ] = useState(comment.isLiked)
    const [ likes, setLikes ] = useState(comment.likes)
    const [ isReplying, setIsReplying ] = useState(false)
    const [ isEditing ,setIsEditing ] = useState(false)
    const [ editedComment, setEditedComment ] = useState(comment.content)
    const [ content, setContent ] = useState('')
    const { likeComment } = useCommentManager(authToken)
    const [ isSettingsVisible, setIsSettingsVisible ] = useState(false)
    const replies = getReplies(comment.id)


    const handleInputChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmitLike = (e) => {
        e.stopPropagation()
        likeComment(comment.id)
        const num = isLiked ? -1 : 1
        setLikes(prev => prev + num)
        setIsLiked(prev => !prev)
    }

    const toggleReplying = () => {
        setIsReplying(prev => !prev)
    }

    const handleRepost = () => {
        
    }

    const toggleEditing = () => {
        setIsSettingsVisible(prev => !prev)
        setIsEditing(prev => !prev)
    }

    const handleEditComment = async () => {
        if (
            !editedComment || 
            !editedComment.trim() ||
            editedComment === comment.content
        ) return;
        editLocalComment(comment.id, editedComment)
    }

    const handleSubmitReply = async () => {
        toggleReplying()
        if (!content) return
        await replyLocalComment(comment.id, content)
    }

    return (
        <div className="w-full">
            <div className="flex w-full gap-4">
                <Link to={`/profile/${comment.user.id}`}>
                    <img src={comment.user.profile_image} className="object-cover w-8 h-8 rounded-full"/>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Link to={`/profile/${comment.user.id}`} className="text-md text-slate-600 hover:text-text">{comment.user.name}</Link>
                        <span className="text-slate-800">&middot;</span>
                        <span className="text-sm text-secondary">{dayjs(comment.created_at).fromNow()}</span>
                    </div>
                    {isEditing ? 
                    <input 
                        type="text" 
                        autoFocus
                        name="content" 
                        className="w-full px-2 py-3 mt-4 bg-transparent border rounded-full border-slate-800"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleEditComment()
                                setIsEditing(prev => !prev)
                            }
                        }}
                        />
                    :
                    <p className="mt-4">{comment.content}</p>
                    }
                    <div className="flex items-center gap-2 mt-2">
                        <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes hover:bg-primary rounded-xl' onClick={handleSubmitLike}>
                            <FontAwesomeIcon icon={faThumbsUp}  className={` group-hover/likes:text-text ${isLiked ? 'text-primary' : 'text-text'}`}/>
                        </button>
                        <p className='text-sm'>{likes}</p>
                        <button className='flex items-center gap-2 px-2 py-2 shadow-md group/likes hover:bg-primary bg-red rounded-xl' onClick={toggleReplying}>
                            <FontAwesomeIcon icon={faMessage}  className='text-text group-hover/likes:text-text'/>
                            <p className='text-sm'>Reply</p>
                        </button>
                        <button className='flex items-center gap-4 px-2 py-2 shadow-md group/retweet hover:bg-primary rounded-xl' onClick={handleRepost}>
                            <FontAwesomeIcon icon={faRetweet}  className='text-text group-hover/likes:text-primary'/>
                            <p className='text-sm'>100</p>
                        </button>
                        <div className="relative group">
                            <button className={`${isSettingsVisible && 'bg-primary'} flex items-center gap-4 px-2 py-2 shadow-md group/retweet hover:bg-primary rounded-xl`} onClick={() => setIsSettingsVisible(prev => !prev)}>
                                <FontAwesomeIcon icon={faEllipsis}  className='text-text group-hover/likes:text-primary'/>
                            </button>
                            <div className={`absolute ${isSettingsVisible ? 'block' : 'hidden'} left-0 top-auto w-[140px] rounded bg-background border-primary border shadow z-10`}>
                                <div className="flex items-center gap-2 px-4 py-2 hover:cursor-pointer hover:bg-primary">
                                    <FontAwesomeIcon icon={faFlag} />
                                    <p>Report</p>
                                </div>
                                {comment.user.id == user.id && 
                                <>
                                <div className="flex items-center gap-2 px-4 py-2 hover:cursor-pointer hover:bg-primary" onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencil} />
                                    <p>Edit</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 hover:cursor-pointer hover:bg-primary" onClick={() => deleteLocalComment(comment.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <p>Delete</p>
                                </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`${isReplying ? 'block' : 'hidden'} w-full mt-2 border rounded-lg border-slate-800`}>
                        <div>
                            <textarea 
                                name="content" 
                                rows="4" 
                                autoFocus
                                value={content}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-transparent border-t rounded-t-lg outline-none text-md border-slate-800"></textarea>
                        </div>
                        <div className="flex justify-end gap-2 p-2 rounded-b-l">
                            <button className="p-2 text-sm rounded-md bg-secondary" onClick={toggleReplying}>Cancel</button>
                            <button className="p-2 text-sm rounded-md bg-primary" onClick={handleSubmitReply}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 py-2" >
                <div></div>
                <div className="w-full">
                {replies && replies.map(reply => (<Comment comment={reply} key={reply.id}/>)) }
                </div>
            </div>
        </div>
    )
}

export default Comment