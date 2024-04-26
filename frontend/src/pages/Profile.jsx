import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Link } from 'react-router-dom'
import useUserManager from "../hooks/useUserManager"
import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner"
import usePostManager from "../hooks/usePostManager"
import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import Post from "../components/Post"
import InfiniteScroll from "react-infinite-scroll-component"
import PostEnd from "../components/PostEnd"

dayjs.extend(RelativeTime)

const Profile = () => {
    const { id } = useParams()
    const { authToken, user:currentUser} = useContext(AuthContext)
    const { loading, status:userStatus, user, getUser, editUser, followUser } = useUserManager(authToken)
    const { posts, status:postStatus, getUserPosts, hasMorePosts } = usePostManager(authToken)
    const [ isFollowing, setIsFollowing ] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const tempUser = await getUser(id)
            setIsFollowing(tempUser.is_following)
            getUserPosts(tempUser.id) 
        }
        
        fetchUser()
    }, [id])

    const handleFollow = async () => {
        setIsFollowing(prev => !prev)
        followUser(id)
    }

    const fetchMorePosts = () => {
        if (hasMorePosts) {
            getUserPosts(id)
        }
    }
    
    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div>
            <div className="relative md:container md:mx-auto">
                {user.banner ?
                <img src={`${user.banner}`} className="object-cover h-[140px] md:h-[260px] rounded shadow-md w-full "></img>
                :
                <div className="h-[140px] md:h-[240px] bg-blue-800 rounded shadow-md w-full"></div>
                }
                {user.profile_image ? 
                <img src={`${user.profile_image}`} className="absolute top-auto object-cover w-40 h-40 -translate-y-1/2 border rounded-full border-slate-800 md:-translate-x-1/2 left-4 md:left-1/2"></img>
                :
                <div className="absolute top-auto overflow-hidden -translate-y-1/2 bg-black border rounded-full border-slate-800 md:-translate-x-1/2 left-4 md:left-1/2">
                    <FontAwesomeIcon icon={faUser} className="w-40 h-40 rounded-full bg-slate-800"/>
                </div>
                }
            </div>
            <div className="container grid items-center justify-between grid-cols-2 gap-4 px-8 pt-24 pb-20 mx-auto">
                <div className="md:text-center md:col-span-2">
                    <p className="text-2xl font-bold">{user.name}</p>
                    <p>{user.email}</p>
                </div>
                <div className="text-right md:text-center md:col-span-2">
                    {user.id === currentUser.id ? 
                    <Link to="/settings" className="inline-block px-4 py-2 border rounded-xl hover:cursor-pointer hover:bg-white hover:text-black">Edit Profile</Link>
                    :
                    <div className={`inline-block px-4 py-2 border bg-opacity-80 ${!isFollowing ? "bg-primary border-transparent hover:bg-opacity-100 hover:text-white" : "hover:bg-secondary"} rounded-xl hover:cursor-pointer`} onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</div>
                    }
                </div>
                <div></div>
            </div>
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
        </div>
    )
}

export default Profile