import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'


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
            <div className='flex gap-8'>
                <div className='flex-1'>
                    <h1 className='text-4xl font-bold text-slate-300'>Home Page</h1>
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
                <div className='flex flex-col basis-80'>
                    <div className='p-8 border rounded-md shadow border-slate-500'>
                        Hello {user.username}!!
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Home