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

    return {
        notifications,
        loading,
        hasUnreadNotifications,
        getNotifications,
    }
}

export default useNotificationManager