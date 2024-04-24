import { createContext } from "react"
import { v4 as uuidv4 } from "uuid"

const SystemPopupsContext = createContext()

export default SystemPopupsContext

export const SystemPopupsProvider = ({ children }) => {
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