import { Link } from "react-router-dom"
import dayjs from "../utils/dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage, faRetweet, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Comment = ({ comment, likeComment }) => {
    const [ isLiked, setIsLiked ] = useState(comment.isLiked)
    const [ likes, setLikes ] = useState(comment.likes)

    const handleSubmitLike = async (e) => {
        e.stopPropagation()
        likeComment(comment.id)
        const num = isLiked ? -1 : 1
        setLikes(prev => prev + num)
        setIsLiked(prev => !prev) 
    }

    const handleRepost = (e) => {
        e.stopPropagation()
    }

    return (
        <div className="flex gap-4 px-12 py-2">
            <Link to={`/profile/${comment.user.name}`}>
                <img src={comment.user.profile_image} alt="" className="object-cover w-8 h-8 rounded-full" />
            </Link>
            <div className="p-1">
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
                    <button className='flex items-center gap-2 px-2 py-2 shadow-md group/likes hover:bg-primary bg-red rounded-xl'>
                        <FontAwesomeIcon icon={faMessage}  className='text-text group-hover/likes:text-text'/>
                        <p className='text-sm'>Reply</p>
                    </button>
                    <button className='flex items-center gap-4 px-2 py-2 shadow-md group/retweet hover:bg-primary rounded-xl' onClick={handleRepost}>
                        <FontAwesomeIcon icon={faRetweet}  className='text-text group-hover/likes:text-primary'/>
                        <p className='text-sm'>100</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Comment