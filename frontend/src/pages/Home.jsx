import React, { useEffect, useState } from 'react'


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
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts(userPosts)
    }, [])

    return (
        <div className='px-12'>
            <h1 className='text-4xl font-bold text-slate-300'>Home Page</h1>
            <div className='flex flex-col gap-4 mt-12'>
                { userPosts && userPosts.map(post => {
                    return (
                        <div className='border border-transparent bg-gray-700 w-2/3 bg-opacity-20 p-4 rounded shadow hover:border-blue-800 hover:cursor-pointer'>
                            <p className='text-2xl font-bold text-blue-800'>{post.title}</p>
                            <p className='mt-4'>{post.description}</p>
                        </div>
                    )
                })}
                { userPosts && userPosts.map(post => {
                    return (
                        <div className='border border-transparent bg-gray-700 w-2/3 bg-opacity-20 p-4 rounded shadow hover:border-blue-800 hover:cursor-pointer'>
                            <p className='text-2xl font-bold text-blue-800'>{post.title}</p>
                            <p className='mt-4'>{post.description}</p>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Home