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
import Post from '../components/Post'
import InfiniteScroll from 'react-infinite-scroll-component'

dayjs.extend(relativeTime)

const Home = () => {
    const { user, authToken } = useContext(AuthContext)
    const { posts, getPosts, hasMorePosts } = usePostManager(authToken)

    useEffect(() => {
        const fetchData = async () => {
            await getPosts()
        }

        fetchData()
    }, [])

    const fetchMorePosts = () => {
        if (hasMorePosts) {
            getPosts(true)
        }
    }

    return (
        <div className='flex flex-col gap-8 mt-4 md:flex-row'>
            <div className='flex flex-col md:order-2'>
                <div className='p-8 border rounded-md shadow bg-secondary md:sticky md:top-28 border-slate-500'>
                    <p className='mb-4'>Hello {user.username}!!</p>
                    <Link to="/post" className='px-3 py-2 hover:bg-accent'>
                        <FontAwesomeIcon icon={faPencil} /> Write a Post
                    </Link>
                </div> 
            </div>
            <div className='flex-1'>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={hasMorePosts}
                    loader={<Spinner />}>
                    
                <div className='flex flex-col gap-4'>
                        { posts && posts.map((post, index) => {
                            return (<Post post={post} key={post.id}/>)
                        })}
                    
                </div>
                    </InfiniteScroll>
            </div>
        </div>
    )
}

export default Home