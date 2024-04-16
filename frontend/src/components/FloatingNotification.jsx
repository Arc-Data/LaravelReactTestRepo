import { useContext, useState } from "react"
import NotificationContext from "../context/NotificationContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCheckCircle, faTrash, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"

const FloatingNotification = () => {
    const { notifications } = useContext(NotificationContext)

    return (
        <div className="fixed z-30 p-4 text-white bottom-4 right-4">
            {notifications.map((notification, index) => {
                return (
                    <div key={index} className={`notification flex items-center gap-4 p-4 transition-transform duration-300 border-l border-blue-500 ease-in-out bg-secondary mb-4 z-30 `}>
                        {notification.type === "error" ? 
                        <FontAwesomeIcon icon={faXmarkCircle} />
                        :
                        <FontAwesomeIcon icon={faCheckCircle} />
                        }
                        <p>{notification.message}</p>   
                        
                    </div>
                )
            })}
        </div>
    )
}

export default FloatingNotification