import { useContext, useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import useUserManager from "../hooks/useUserManager"
import Spinner from "../components/Spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons"
import UserNotFound from "../error/UserNotFound"

const useHover = () => {
    const [hovering, setHovering ] = useState(false)
    const onHoverProps = {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => setHovering(false)
    }

    return [hovering, onHoverProps]
}

const ProfileLayout = () => {
    const { id } = useParams()
    const { authToken, user:currentUser } = useContext(AuthContext)
    const { loading, user, getUser, followUser, status, notifyMe } = useUserManager(authToken)
    const [ isFollowing, setIsFollowing ] = useState(false)
    const [ isNotified, setIsNotified ] = useState(false)
    const [ isBlocked, setIsBlocked] = useState(false)
    const [ blockButtonIsHovering, blockButtonProps ] = useHover()
 
    useEffect(() => {
        const fetchUser = async () => {
            const tempUser = await getUser(id)
            setIsFollowing(tempUser?.is_following)
            setIsNotified(tempUser?.notify)
            setIsBlocked(tempUser?.blocked)
        }

        fetchUser()
    }, [id])

    const toggleBlock = () => {
        setIsBlocked(prev => !prev)
    }

    const handleNotify = async () => {
        setIsNotified(prev => !prev)
        notifyMe(id)
    }

    const handleFollow = async () => {
        setIsFollowing(prev => !prev)
        followUser(id)
    }

    if (!user && status === "404") {
        return (<UserNotFound/>)
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
                <div className="flex items-center justify-end gap-4">
                {isBlocked ? 
                <button 
                    {...blockButtonProps}
                    className={`inline-block px-5 py-2.5 border bg-opacity-80 bg-red-800 border-transparent hover:bg-opacity-100 hover:text-white" : "hover:bg-secondary"} rounded-xl hover:cursor-pointer`} onClick={toggleBlock}>
                        {blockButtonIsHovering ? "Unblock" : "Block"}
                    </button>
                :
                <>
                {isFollowing && <FontAwesomeIcon icon={faBell}  className={`${isNotified ? "text-primary hover:bg-white " : "hover:bg-secondary"} text-xl p-3 border border-slate-800 rounded-full fa-solid hover:cursor-pointer`} onClick={handleNotify}/>}
                {user.id === currentUser.id ? 
                <Link to="/settings/profile" className="inline-block px-4 py-2 border rounded-xl hover:cursor-pointer hover:bg-white hover:text-black">Edit Profile</Link>
                :
                <div className={`inline-block px-4 py-2 border bg-opacity-80 ${!isFollowing ? "bg-primary border-transparent hover:bg-opacity-100 hover:text-white" : "hover:bg-secondary"} rounded-xl hover:cursor-pointer`} onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</div>
                }   
                </>
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
            {isBlocked ? 
            <div className="text-center">
                <h1 className="text-xl font-bold">You have blocked this user.</h1>
                <p className="text-slate-600">You can no longer view posts from this user</p>
            </div>
            :
            <Outlet />
            }
        </div>
    )
}

export default ProfileLayout