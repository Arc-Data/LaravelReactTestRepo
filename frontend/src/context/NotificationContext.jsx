import { createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children }) => {
    const [ notifications, setNotifications ] = useState([]) 
    const [ timeOutIds, setTimeoutIds ] = useState([])

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

        console.log("Removed notif.", new Date().toLocaleTimeString());
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
