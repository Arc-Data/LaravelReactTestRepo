import { useState } from "react"
import axios from "../axios"

const useNotificationManager = (authToken) => {
    const [ notifications, setNotifications ] = useState([]) 
    const [ loading, setLoading ] = useState(true)
    const [ hasUnreadNotifications, setHasUnreadNotifications ] = useState(false)

    const getNotifications = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/notifications',  {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setNotifications(response.data)
            
        }
        catch(error) {
            console.log("An error occured: ", error)
        }
        setLoading(false)
    }

    const markNotificationsAsRead = async () => {
        try {
            const response = await axios.patch('/api/notifications/', null, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            setHasUnreadNotifications(false)
        } catch(error) {
            console.log("An error occured : ", error)
        }
    }

    const hasNewNotification = () => {
        setHasUnreadNotifications(true)
    }

    const getUnreadNotificationsStatus = async () => {
        try {
            const response = await axios.get('/api/notifications/unread', {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setHasUnreadNotifications(response.data.unread)
        }
        catch (error) {
            console.log("An error occured: ", error)
        }
    }

    return {
        notifications,
        loading,
        getNotifications,
        hasUnreadNotifications,
        getUnreadNotificationsStatus,
        markNotificationsAsRead,
        hasNewNotification
    }
}

export default useNotificationManager