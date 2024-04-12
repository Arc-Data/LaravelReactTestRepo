import RelativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs"
import { useNavigate } from 'react-router-dom'

dayjs.extend(RelativeTime)

const Post = ({ post }) => {
    const navigate = useNavigate()

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
            <p className='mt-4' dangerouslySetInnerHTML={{ __html: post.description}} />
        </div>
    )
}

export default Post