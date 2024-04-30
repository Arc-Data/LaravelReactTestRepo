import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import useUserManager from "../hooks/useUserManager"
import UserListItem from "../components/UserListItem"
import InfiniteScroll from "react-infinite-scroll-component"
import PostEnd from "../components/PostEnd"

const Followers = () => {
    const { id } = useParams()
    const { authToken, user:currentUser } = useContext(AuthContext)
    const { users, getUserFollowers, hasMoreUsers } = useUserManager(authToken)
    
    const fetchMoreUsers = () => {
        if (hasMoreUsers) {{
            getUserFollowers()
        }}
    }

    useEffect(() => {
        getUserFollowers(id)
    }, [id])

    return (
        <div>
            <p className="p-8">This user is followed by.</p>
            <InfiniteScroll 
                dataLength={users.length}
                next={fetchMoreUsers}
                hasMore={hasMoreUsers}
                loader={<Spinner/>}
                endMessage={<PostEnd/>}>
                {users.map(user => {
                    return (
                        <UserListItem user={user} key={user.id} followDisabled={id == currentUser.id || user.id === currentUser.id}/>    
                    )
                })}
            </InfiniteScroll>
        </div>
    )
}

export default Followers