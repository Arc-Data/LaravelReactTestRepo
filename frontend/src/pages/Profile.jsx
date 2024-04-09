import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Link } from 'react-router-dom'
import useUserManager from "../hooks/useUserManager"
import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner"
import usePostManager from "../hooks/usePostManager"
import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(RelativeTime)

const Profile = () => {
    const { name } = useParams()
    const { authToken, user:currentUser} = useContext(AuthContext)
    const { loading:userLoading, status:userStatus, user, getUser, editUser } = useUserManager(authToken)
    const { loading:postLoading, posts, status:postStatus, getUserPosts, meta, links } = usePostManager(authToken)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async (name) => {
            const tempUser = await getUser(name)
            getUserPosts(tempUser.id) 
        }
        
        fetchUser(name)
    }, [name])
    
    if (userLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div>
            <div className="relative md:container md:mx-auto">
                <div className="h-[140px] rounded shadow-md w-full bg-blue-800"></div>
                <div className="absolute top-auto w-40 h-40 -translate-y-1/2 bg-black border rounded-full border-slate-800 md:-translate-x-1/2 left-4 md:left-1/2"></div>
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
                    <div className="inline-block px-4 py-2 border rounded-xl hover:cursor-pointer hover:bg-white hover:text-black">Connect</div>
                    }
                </div>
                <div></div>
            </div>
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
                    { postLoading && <Spinner />}
                </div>
            
        </div>
    )
}

export default Profile