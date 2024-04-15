import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children }) => {
    const [ notifications, setNotifications ] = useState([]) 

    const removeNotification = (message) => {
        setNotifications(notifications.filter(notif => notif !== message))
    }

    const addNotification = (message) => {
        setNotifications(prev => ([
            ...prev,
            message
        ]))
    
        setTimeout(() => {
            removeNotification(message)
        }, 2000)
    }

    const contextData = {
        notifications,
        addNotification,
        removeNotification,
    }

    return (
        <NotificationContext.Provider value={contextData}>
            {children}
        </NotificationContext.Provider>
    )
}
