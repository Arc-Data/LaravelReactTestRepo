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
        const testFunction = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/test');
                console.log(response);
                const data = await response.json();
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }

        testFunction()
        setPosts(userPosts)
    }, [])

    return (
        <div className='px-12'>
            <h1 className='text-4xl font-bold text-slate-300'>Home Page</h1>
            <div className='flex flex-col gap-4 mt-12'>
                { userPosts && userPosts.map(post => {
                    return (
                        <div className='w-2/3 p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 hover:cursor-pointer'>
                            <p className='text-2xl font-bold text-blue-800'>{post.title}</p>
                            <p className='mt-4'>{post.description}</p>
                        </div>
                    )
                })}
                { userPosts && userPosts.map(post => {
                    return (
                        <div className='w-2/3 p-4 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 hover:cursor-pointer'>
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