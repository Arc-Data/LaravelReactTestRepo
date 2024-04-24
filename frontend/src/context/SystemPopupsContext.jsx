import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import EchoInstance from "../utils/EchoInstance"
import AuthContext from "./AuthContext"
import NotificationContext from "./NotificationContext"

const SystemPopupsContext = createContext()

export default SystemPopupsContext

export const SystemPopupsProvider = ({ children }) => {
    const { hasNewNotification } = useContext(NotificationContext)
    const { user } = useContext(AuthContext)
    const [ popups, setPopups ] = useState([])
    const [ timeOutIds, setTimeoutIds ] = useState([])

    const removePopup = (id) => {
        setPopups(popups => popups.filter(popup => popup.id !== id))
        clearTimeout(timeOutIds[id])
        setTimeoutIds(prevTimeOutIds => {
            const updatedTimeoutIds = {...prevTimeOutIds}
            delete updatedTimeoutIds[id]
            return updatedTimeoutIds
        })
    } 

    const addPopup = (message, type="success") => {
        const id = uuidv4()
        setPopups(prevPopups => ([
            ...prevPopups,
            { id, message, type: type }
        ]))

        const timeoutId = setTimeout(() => {
            removePopup(id)
        }, 4000)

        setTimeoutIds(prev => ({...prev, [id]: timeoutId}))
    }


    useEffect(() => {
        EchoInstance.private(`App.User.${user.id}`)
            .notification(notification => {
                addPopup(notification.message)
                hasNewNotification()
            })

        return () => {
            addPopup("When does this happen")
            EchoInstance.leave(`App.User.${user.id}`)
        }
    }, [])

    const contextData = {
        popups, 
        addPopup,
        removePopup,
    }

    return (
        <SystemPopupsContext.Provider value={contextData}>
            { children }
        </SystemPopupsContext.Provider>
    )
}