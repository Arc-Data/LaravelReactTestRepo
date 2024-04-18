import { Link } from "react-router-dom"
import dayjs from "../utils/dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage, faRetweet, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Comment = ({ comment, likeComment, replyComment, getReplies }) => {
    const [ isLiked, setIsLiked ] = useState(comment.isLiked)
    const [ likes, setLikes ] = useState(comment.likes)
    const [ isReplying, setIsReplying ] = useState(false)
    const [ content, setContent ] = useState('')

    const handleSubmitLike = async (e) => {
        e.stopPropagation()
        likeComment(comment.id)
        const num = isLiked ? -1 : 1
        setLikes(prev => prev + num)
        setIsLiked(prev => !prev) 
    }

    const toggleReplying = () => {
        setIsReplying(prev => !prev)
    }

    const handleRepost = (e) => {
        e.stopPropagation()
    }

    const handleSubmitReply = (e) => {
        toggleReplying()
        if (!content) return
        replyComment(comment.id, content)
        setContent('')
    }

    const handleInputChange = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className="ml-12">
            <div className="flex w-full gap-4 py-2">
                <Link to={`/profile/${comment.user.name}`}>
                    <img src={comment.user.profile_image} alt="" className="object-cover w-8 h-8 rounded-full" />
                </Link>
                <div className="flex-1 p-1">
                    <div className="flex items-center gap-2">
                        <Link to={`/profile/${comment.user.name}`} className="text-md text-slate-600 hover:text-text">{comment.user.name}</Link>
                        <span className="text-slate-800">&middot;</span>
                        <span className="text-sm text-secondary">{dayjs(comment.created_at).fromNow()}</span>
                    </div>
                    <p className="mt-4">{comment.content}</p>
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
                    </div>
                    {isReplying && 
                    <div className="w-full mt-2 border rounded-lg border-slate-800">
                        <div>
                            <textarea 
                                name="content" 
                                rows="4" 
                                value={content}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-transparent border-t rounded-t-lg outline-none text-md border-slate-800"></textarea>
                        </div>
                        <div className="flex justify-end gap-2 p-2 rounded-b-l">
                            <button className="p-2 text-sm rounded-md bg-secondary" onClick={toggleReplying}>Cancel</button>
                            <button className="p-2 text-sm rounded-md bg-primary" onClick={handleSubmitReply}>Submit</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
            {getReplies && (
                comment.replies &&
                comment.replies.map(reply => (
                    <Comment key={reply.id} comment={reply} likeComment={likeComment} replyComment={replyComment} />
                ))
            )}
        </div>
    )
}

export default Comment