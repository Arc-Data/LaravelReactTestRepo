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
            setNotifications(response.data.notifications)
            
        }
        catch(error) {
            console.log("An error occured: ", error)
        }
        setLoading(false)
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
    }
}

export default useNotificationManager