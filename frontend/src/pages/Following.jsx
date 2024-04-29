import { useParams } from "react-router-dom"
import useUserManager from "../hooks/useUserManager"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import UserListItem from "../components/UserListItem"

const Following = () => {
    const { id } = useParams()
    const { authToken, user:currentUser } = useContext(AuthContext) 
    const { users, loading, getUserFollowings } = useUserManager(authToken)

    useEffect(() => {
        getUserFollowings(id)
    }, [id])

    return (
        <div>
            <p className="p-8">This user follows.</p>
            {users.map(user => {
                console.log(user)
                return (
                    <UserListItem user={user} key={user.id} followDisabled={id == currentUser.id || user.id === currentUser.id}/>    
                )
            })}
        </div>
    )
}


export default Following