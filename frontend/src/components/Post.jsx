import RelativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faRetweet, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import usePostManager from '../hooks/usePostManager'
import AuthContext from '../context/AuthContext'
import CustomCarousel from './CustomCarousel'

dayjs.extend(RelativeTime)

const Post = ({ post }) => {
    const navigate = useNavigate()
    const [ showFullText, setShowFullText ] = useState(false)
    const { authToken } = useContext(AuthContext)
    const { likePost } = usePostManager(authToken)
    const [ likes, setLikes ] = useState(post.likes)
    const [ isLiked, setIsLiked ] = useState(post.isLiked)

    const handleSubmitLike = async (e) => {
        e.stopPropagation()
        const num = isLiked ? -1 : 1
        likePost(post.id)
        setLikes(prev => prev + num)
        setIsLiked(prev => !prev) 
    }

    const handleRepost = (e) => {
        e.stopPropagation()
    }

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
    }

    return (
        <div className='p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 max-w-[900px] hover:cursor-pointer'>
            <div onClick={() => navigate(`/post/${post.id}`)}>
                <div className='flex items-center gap-2 mb-2 text-sm text-slate-600'>
                    <div className='flex items-center gap-2 group/profile' onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/profile/${post.user.id}`)
                    }}>
                        <img src={post.user?.profile_image} className="object-cover w-8 h-8 rounded-full" alt="" />
                        <span 
                            className='group-hover/profile:text-slate-200' 
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/profile/${post.user.id}`)
                            }}>
                            {post.user?.name}
                        </span> 
                    </div>
                    <span className="text-2xl font-bold">&middot;</span> 
                    <span>{dayjs(post.created_at).fromNow()}</span>
                </div>
                <p className='text-2xl font-bold group-hover:text-primary'>{post.title}</p>
            </div>
            <p className={`mt-2 `}  dangerouslySetInnerHTML={{ __html: showFullText ? post.description : truncateText(post.description, 100)}} />
            <button className={`${post.description.length < 100 ? "hidden" : "block"} underline text-primary`} onClick={(e) => {
                e.stopPropagation()
                setShowFullText(prev => !prev)
            }}>
                {showFullText ? 'Read Less' : 'Read More'}
            </button>
            {post.images && post.images.length !== 0 && 
            <CustomCarousel images={post.images} />
            }
            <div className='flex gap-4 mt-2'>
                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl' onClick={handleSubmitLike}>
                    <FontAwesomeIcon icon={faThumbsUp}  className={`${isLiked ? 'text-primary' : 'text-black'} group-hover/likes:text-primary`}/>
                    <p className='text-sm text-slate-400'>{likes}</p>
                </button>
                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl'>
                    <FontAwesomeIcon icon={faMessage}  className='text-black text-opacity-40 group-hover/likes:text-primary'/>
                    <p className='text-sm text-slate-400'>{post.replies}</p>
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