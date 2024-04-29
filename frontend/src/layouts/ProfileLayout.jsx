import { useContext, useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import useUserManager from "../hooks/useUserManager"
import Spinner from "../components/Spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const ProfileLayout = () => {
    const { id } = useParams()
    const { authToken, user:currentUser } = useContext(AuthContext)
    const { loading, user, getUser, followUser } = useUserManager(authToken)
    const [ isFollowing, setIsFollowing ] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const tempUser = await getUser(id)
            setIsFollowing(tempUser.is_following)
        }

        fetchUser()
    }, [id])

    const handleFollow = async () => {
        setIsFollowing(prev => !prev)
        followUser(id)
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
                <img src={`${user.profile_image}`} className="absolute top-auto object-cover w-40 h-40 -translate-y-1/2 border rounded-full border-slate-800 md:-translate-x-1/2 left-4 md:left-24 "></img>
                :
                <div className="absolute top-auto overflow-hidden -translate-y-1/2 bg-black border rounded-full border-slate-800 md:-translate-x-1/2 left-4 md:left-1/2">
                    <FontAwesomeIcon icon={faUser} className="w-40 h-40 rounded-full bg-slate-800"/>
                </div>
                }
            </div>
            <div className="container grid items-center justify-between grid-cols-2 gap-4 px-8 pt-24 pb-20 mx-auto">
                <div className="">
                    <p className="text-2xl font-bold">{user.name}</p>
                </div>
                <div className="text-right">
                    {user.id === currentUser.id ? 
                    <Link to="/settings" className="inline-block px-4 py-2 border rounded-xl hover:cursor-pointer hover:bg-white hover:text-black">Edit Profile</Link>
                    :
                    <div className={`inline-block px-4 py-2 border bg-opacity-80 ${!isFollowing ? "bg-primary border-transparent hover:bg-opacity-100 hover:text-white" : "hover:bg-secondary"} rounded-xl hover:cursor-pointer`} onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</div>
                    }
                </div>
                <div className="col-span-2">
                    <p>{user.about}</p>
                    <div className="flex gap-4 mt-4 text-sm">
                        <Link to={`/profile/${id}/followers`}>{user.followers} Followers</Link>    
                        <Link to={`/profile/${id}/following`} >{user.followings} Following</Link>    
                        <Link to={`/profile/${id}/`}>{user.posts} Posts</Link>    
                    </div>    
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default ProfileLayout