import { useState } from "react"
import axios from "../axios"

const useNotificationManager = (authToken) => {
    const [ notifications, setNotifications ] = useState([]) 
    const [ loading, setLoading ] = useState(true)
    const [ hasUnreadNotifications, setHasUnreadNotifications ] = useState(false)
    const [ hasMoreNotifications, setHasMoreNotifications ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(1)

    const getNotifications = async () => {
        setLoading(true)
        try {
            const url = `/api/notifications?page=${currentPage}`;
            const response = await axios.get(url,  {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setNotifications(prevNotifications => [...prevNotifications, ...response.data.data])
            
            if (response.data.links && response.data.links.next) {
                setCurrentPage(prev => prev + 1) 
                setHasMoreNotifications(true)
            } else {
                setHasMoreNotifications(false)
            }
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

    const refreshNotifications = async () => {
        setCurrentPage(1)
        setLoading(true)
        try {
            const url = `/api/notifications?page=1`;
            const response = await axios.get(url,  {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setNotifications(response.data.data)

            if (response.data.links && response.data.links.next) {
                setCurrentPage(prev => prev + 1) 
                setHasMoreNotifications(true)
            } else {
                setHasMoreNotifications(false)
            }
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
        markNotificationsAsRead,
        hasNewNotification,
        hasMoreNotifications,
        refreshNotifications,
    }
}

export default useNotificationManager