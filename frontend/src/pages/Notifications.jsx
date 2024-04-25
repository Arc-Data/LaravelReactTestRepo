import { useContext, useEffect, useState } from "react"
import AuthContext from '../context/AuthContext'
import useNotificationManager from "../hooks/useNotificationManager"
import Spinner from '../components/Spinner'
import dayjs from "../utils/dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import NotificationContext from "../context/NotificationContext"
import { Link } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import PostEnd from "../components/PostEnd"

dayjs.extend(RelativeTime)

const Notifications = () => {
    
    const { authToken } = useContext(AuthContext)
    const { notifications, loading, getNotifications, hasMoreNotifications } = useNotificationManager(authToken)
    const { markNotificationsAsRead } = useContext(NotificationContext)

    useEffect(() => {
        getNotifications()
        markNotificationsAsRead()
    }, [])

    const fetchMoreNotifications = () => {
        if (hasMoreNotifications) {
            getNotifications()
        }
    }

    return (
        <InfiniteScroll
            dataLength={notifications.length}
            next={fetchMoreNotifications}
            hasMore={hasMoreNotifications}
            loader={<Spinner />}
            endMessage={<PostEnd/>}
            >
            {notifications.map(notification => {
                return (
                    <Link 
                        to={notification?.link} 
                        className={`flex items-center gap-4 px-2 py-4 mt-2 ${notification.read_at ? "bg-gray-700 bg-opacity-20" : "bg-secondary"} border border-transparent rounded shadow hover:cursor-pointer`} key={notification.id}>
                        <div></div>
                        <img src={notification?.sender?.profile_image} className="object-cover w-10 h-10 rounded-full"/>
                        <p className="flex-1">{notification?.message}</p>
                        <div className="text-right">
                            <p className="text-xs">{dayjs(notification.created_at).fromNow()}</p>
                        </div>
                    </Link>
                )
            })}
        </InfiniteScroll>
    )
}

export default Notifications