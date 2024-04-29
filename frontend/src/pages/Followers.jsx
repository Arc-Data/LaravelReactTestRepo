import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import useUserManager from "../hooks/useUserManager"
import UserListItem from "../components/UserListItem"

const Followers = () => {
    const { id } = useParams()
    const { authToken, user:currentUser } = useContext(AuthContext)
    const { users, loading, getUserFollowers } = useUserManager(authToken)
    
    useEffect(() => {
        getUserFollowers(id)
    }, [id])

    return (
        <div>
            <p className="p-8">This user is followed by.</p>
            {users.map(user => {
                console.log(user)
                return (
                    <UserListItem user={user} key={user.id} followDisabled={id == currentUser.id || user.id === currentUser.id}/>    
                )
            })}
        </div>
    )
}

export default Followers