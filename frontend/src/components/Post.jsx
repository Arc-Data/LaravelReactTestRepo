import RelativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faRetweet, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import NotificationContext from '../context/NotificationContext'

dayjs.extend(RelativeTime)

const Post = ({ post }) => {
    const navigate = useNavigate()
    const { addNotification } = useContext(NotificationContext)
    const [ likes, setLikes ] = useState(post.likes)
    const [ isLiked, setIsLiked ] = useState(post.isLiked)

    const handleSubmitLike = (e) => {
        e.stopPropagation()
        const num = isLiked ? -1 : 1
        setLikes(prev => prev + num)
        setIsLiked(prev => !prev) 
        addNotification("Post liked.")        
    }

    const handleRepost = (e) => {
        e.stopPropagation()
        addNotification("Post reposted")
    }

    return (
        <div 
            onClick={() => navigate(`/post/${post.id}`)}
            className='p-4 bg-gray-700 border border-transparent rounded shadow group bg-opacity-20 hover:border-blue-800 hover:cursor-pointer'>
            <div className='flex items-center gap-2 mb-2 text-sm text-slate-600'>
                <div className='flex items-center gap-2 group' onClick={(e) => {}}>
                    <img src={post.user.profile_image} className="object-cover w-8 h-8 rounded-full" alt="" />
                    <span 
                        className='group-hover:text-slate-200' 
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/profile/${post.user.name}`)
                        }}>
                        {post.user.name}
                    </span> 
                </div>
                <span className="text-2xl font-bold">&middot;</span> 
                <span>{dayjs(post.created_at).fromNow()}</span>
            </div>
            <p className='text-2xl font-bold group-hover:text-primary'>{post.title}</p>
            <p className='mt-2' dangerouslySetInnerHTML={{ __html: post.description}} />
            <div className='flex gap-4 mt-2'>
                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl' onClick={handleSubmitLike}>
                    <FontAwesomeIcon icon={faThumbsUp}  className='text-black text-opacity-40 group-hover/likes:text-primary'/>
                    <p className='text-sm text-slate-400'>{likes}</p>
                </button>
                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl'>
                    <FontAwesomeIcon icon={faMessage}  className='text-black text-opacity-40 group-hover/likes:text-primary'/>
                    <p className='text-sm text-slate-400'>100</p>
                </button>
                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl' onClick={handleRepost}>
                    <FontAwesomeIcon icon={faRetweet}  className='text-black text-opacity-40 group-hover/likes:text-primary'/>
                    <p className='text-sm text-slate-400'>100</p>
                </button>
            </div>
        </div>
    )
}

export default Post