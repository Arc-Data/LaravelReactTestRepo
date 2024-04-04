import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const userPosts = [
    {
        'id': 1,
        'title': "Post One",
        'description': "Some Long Descriptions"
    },
    {
        'id': 2,
        'title': "Post Two",
        'description': "Some Long Descriptions"
    },
    {
        'id': 3,
        'title': "Post Three",
        'description': "Some Long Descriptions"
    },
    {
        'id': 4,
        'title': "Post Four",
        'description': "Some Long Descriptions"
    },
]

const Home = () => {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts(userPosts)
    }, [])

    return (
        <div className='px-12'>
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
                    <div className='flex flex-col gap-4 mt-12'>
                        { userPosts && userPosts.map(post => {
                            return (
                                <div 
                                key={post.id}
                                className='p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 hover:cursor-pointer'>
                                    <p className='text-2xl font-bold text-blue-800'>{post.title}</p>
                                    <p className='mt-4'>{post.description}</p>
                                </div>
                            )
                        })}
                        { userPosts && userPosts.map(post => {
                            return (
                                <div
                                    key={post.id} 
                                    className='p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 hover:cursor-pointer'>
                                    <p className='text-2xl font-bold text-blue-800'>{post.title}</p>
                                    <p className='mt-4'>{post.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home