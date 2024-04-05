import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import usePostManager from '../hooks/usePostManager'
import Spinner from '../components/Spinner'

const Home = () => {
    const { user, authToken } = useContext(AuthContext)
    const  { posts, getPosts, loading } = usePostManager(authToken)

    console.log(user, authToken)

    useEffect(() => {
        const retrievePosts = async () => {
            await getPosts()
        }
        retrievePosts()
    }, [])

    return (
        <div className='gap-8 md:flex '>
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
                            <Link to={`/post/${post.id}`} 
                            key={post.id}
                            className='p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 hover:cursor-pointer'>
                                <p className='text-2xl font-bold text-blue-800'>{post.title}</p>
                                <p className='mt-4'>{post.description}</p>
                            </Link>
                        )
                    })}
                    { loading && <Spinner />}
                </div>
            </div>
        </div>
    )
}

export default Home