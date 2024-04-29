import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner"
import usePostManager from "../hooks/usePostManager"
import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import Post from "../components/Post"
import InfiniteScroll from "react-infinite-scroll-component"
import PostEnd from "../components/PostEnd"

dayjs.extend(RelativeTime)

const Profile = () => {
    const { id } = useParams()
    const { authToken } = useContext(AuthContext)
    const { posts, getUserPosts, hasMorePosts } = usePostManager(authToken)
    
    useEffect(() => {
        const fetchUser = async () => {
            getUserPosts(id) 
        }
        
        fetchUser()
    }, [id])

    const fetchMorePosts = () => {
        if (hasMorePosts) {
            getUserPosts(id)
        }
    }
    
    return (
        <InfiniteScroll 
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMorePosts}
            loader={<Spinner />}
            endMessage={<PostEnd />}
            >
            <div className='flex flex-col gap-4'>
            { posts && posts.map(post => {
                return (<Post post={post} key={post.id}/>)
            })}
            </div>
        </InfiniteScroll>
    )
}

export default Profile