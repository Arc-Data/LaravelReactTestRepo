import { useContext, useEffect } from "react"
import useUserManager from "../hooks/useUserManager"
import AuthContext from "../context/AuthContext"
import InfiniteScroll from "react-infinite-scroll-component"
import { Spinner } from "flowbite-react"
import UserListItem from "../components/UserListItem"

const Blocked = () => {
    const { authToken } = useContext(AuthContext)
    const { users, hasMoreUsers, getBlockedUsers } = useUserManager(authToken)

    console.log(users)

    useEffect(() => {
        getBlockedUsers()        
    }, [])

    return (
        <div className="mt-10">
            <h1 className="mb-12 text-3xl font-bold">Blocked Users</h1>
            <InfiniteScroll 
                dataLength={users.length}
                next={getBlockedUsers}
                hasMore={hasMoreUsers}
                loader={<Spinner />}
                >
                {users.map(user => {
                    return (
                        <UserListItem user={user} key={user.id} followDisabled={true} />
                    )
                })}
            </InfiniteScroll>
        </div>
    )
}

export default Blocked