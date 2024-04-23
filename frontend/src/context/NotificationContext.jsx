import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import useNotificationManager from "../hooks/useNotificationManager"
import AuthContext from "./AuthContext"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children }) => {
    const [ notifications, setNotifications ] = useState([]) 
    const { authToken } = useContext(AuthContext)
    const [ timeOutIds, setTimeoutIds ] = useState([])
    const { hasUnreadNotifications, getUnreadNotificationsStatus, markNotificationsAsRead } = useNotificationManager(authToken)

    const removeNotification = (id) => {
        setNotifications(prevNotifications => {
            return prevNotifications.filter(notif => notif.id !== id)
        })
        
        clearTimeout(timeOutIds[id]);
        setTimeoutIds(prevTimeOutIds => {
            const updatedTimeoutIds = {...prevTimeOutIds};
            delete updatedTimeoutIds[id];
            return updatedTimeoutIds
        })

    }

    const addNotification = (message, type="success") => {
        const id = uuidv4()
        setNotifications(prev => ([
            ...prev,
            { id, message, type: type }
        ]))
    
        const timeoutId = setTimeout(() => {
            removeNotification(id)
        }, 4000)

        setTimeoutIds(prev => ({...prev, [id]: timeoutId}))
    }

    useEffect(() => {
        getUnreadNotificationsStatus()
    }, [])

    const contextData = {
        notifications,
        addNotification,
        removeNotification,
        hasUnreadNotifications,
        markNotificationsAsRead,
    }

    return (
        <NotificationContext.Provider value={contextData}>
            {children}
        </NotificationContext.Provider>
    )
}
