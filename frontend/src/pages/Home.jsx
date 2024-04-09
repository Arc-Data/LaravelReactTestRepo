import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import usePostManager from '../hooks/usePostManager'
import Spinner from '../components/Spinner'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Home = () => {
    const { user, authToken } = useContext(AuthContext)
    const  { posts, getPosts, loading } = usePostManager(authToken)
    const navigate = useNavigate()

    const handleClick = (e) => {
        console.log("What")
        console.log("Hello")
    }

    useEffect(() => {
        const retrievePosts = async () => {
            await getPosts()
        }
        retrievePosts()
    }, [])

    return (
        <div className='flex flex-col gap-8 mt-4 md:flex-row'>
            <div className='flex flex-col md:order-2'>
                <div className='p-8 bg-black border rounded-md shadow md:sticky md:top-28 border-slate-500'>
                    <p className='mb-4'>Hello {user.username}!!</p>
                    <Link to="/post" className='px-3 py-2 hover:bg-blue-400'>
                        <FontAwesomeIcon icon={faPencil} /> Write a Post
                    </Link>
                </div> 
            </div>
            <div className='flex-1'>
                <div className='flex flex-col gap-4'>
                    { posts && posts.map(post => {
                        return (
                            <div 
                            key={post.id}
                            onClick={() => navigate(`/post/${post.id}`)}
                            className='p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 hover:cursor-pointer'>
                                <p className='flex items-center gap-2 mb-2 text-sm text-slate-600'>
                                    <span 
                                        className='hover:text-slate-200 user-name' 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(`/profile/${post.user.name}`)
                                        }}>
                                        {post.user.name}
                                    </span> 
                                    <span className="text-2xl font-bold">&middot;</span> 
                                    <span>{dayjs(post.created_at).fromNow()}</span>
                                </p>
                                <p className='text-2xl font-bold text-blue-800'>{post.title}</p>
                                <p className='mt-4'>{post.description}</p>
                            </div>
                        )
                    })}
                    { loading && <Spinner />}
                </div>
            </div>
        </div>
    )
}

export default Home