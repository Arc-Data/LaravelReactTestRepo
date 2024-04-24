import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import useNotificationManager from "../hooks/useNotificationManager"
import AuthContext from "./AuthContext"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children }) => {
    const { authToken } = useContext(AuthContext)
    const { hasUnreadNotifications, getUnreadNotificationsStatus, markNotificationsAsRead } = useNotificationManager(authToken)

    useEffect(() => {
        getUnreadNotificationsStatus()
    }, [])

    const contextData = {
        hasUnreadNotifications,
        markNotificationsAsRead,
    }

    return (
        <NotificationContext.Provider value={contextData}>
            {children}
        </NotificationContext.Provider>
    )
}
