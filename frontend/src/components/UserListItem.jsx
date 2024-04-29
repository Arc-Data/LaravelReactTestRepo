import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import useUserManager from "../hooks/useUserManager"

const UserListItem = ({ user, followDisabled }) => {
    const { authToken } = useContext(AuthContext)
    const [ isFollowing, setIsFollowing ] = useState(user.is_following)
    const { followUser } = useUserManager(authToken)
    const navigate = useNavigate()

    const handleFollow = async () => {
        setIsFollowing(prev => !prev)
        followUser(user.id)
    }

    return (
        <div className="flex justify-between px-8 py-4 border-b border-slate-800 hover:cursor-pointer">
            <div className='flex items-center gap-2 group/profile' onClick={(e) => {
                e.stopPropagation()
                navigate(`/profile/${user.id}`)
            }}>
                <img src={user.profile_image} className="object-cover w-8 h-8 rounded-full" alt="" />
                <span 
                    className='group-hover/profile:text-slate-200' 
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/profile/${user.id}`)
                    }}>
                    {user.name}
                </span> 
            </div>
            <div className={`inline-block px-4 py-2 border bg-opacity-80 ${!isFollowing ? "bg-primary border-transparent hover:bg-opacity-100 hover:text-white" : "hover:bg-secondary"} rounded-xl hover:cursor-pointer`} onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</div>
        </div>
    )
}

export default UserListItem