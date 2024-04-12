import { useContext, useState } from "react"
import NotificationContext from "../context/NotificationContext"

const FloatingNotification = () => {
    const { notifications } = useContext(NotificationContext)

    return (
        <div className="fixed p-4 text-white bottom-4 right-4">
            {notifications.map((notification, index) => {
                return (
                    <div key={index} className={`notification rounded-md transition-transform duration-300 p-4 ease-in-out bg-blue-500 mb-4 z-10 `}>
                        {notification}
                    </div>
                )
            })}
        </div>
    )
}

export default FloatingNotification