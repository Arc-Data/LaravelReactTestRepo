import { useParams } from "react-router-dom"
import useUserManager from "../hooks/useUserManager"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import UserListItem from "../components/UserListItem"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../components/Spinner"
import PostEnd from "../components/PostEnd"

const Following = () => {
    const { id } = useParams()
    const { authToken, user:currentUser } = useContext(AuthContext) 
    const { users, getUserFollowings, hasMoreUsers } = useUserManager(authToken)

    const fetchMoreUsers = () => {
        if (hasMoreUsers) {
            getUserFollowings()
        }
    }

    useEffect(() => {
        getUserFollowings(id)
    }, [id])

    return (
        <div>
            <p className="p-8">This user follows.</p>
            <InfiniteScroll
                dataLength={users.length}
                next={fetchMoreUsers}
                hasMore={hasMoreUsers}
                loader={<Spinner />}
                endMessage={<PostEnd />}>
                {users.map(user => {
                    return (
                        <UserListItem user={user} key={user.id} followDisabled={id == currentUser.id || user.id === currentUser.id}/>    
                    )
                })}
            </InfiniteScroll>
        </div>
    )
}


export default Following