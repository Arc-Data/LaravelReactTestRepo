import { useContext, } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import SystemPopupsContext from "../context/SystemPopupsContext"

const FloatingPopup = () => {
    const { popups } = useContext(SystemPopupsContext) 

    return (
        <div className="fixed z-30 p-4 text-white bottom-4 right-4">
            {popups.map((popup, index) => {
                return (
                    <div key={index} className={`popup flex items-center gap-4 p-4 transition-transform duration-300 border-l border-blue-500 ease-in-out bg-secondary mb-4 z-30 `}>
                        {popup.type === "error" ? 
                        <FontAwesomeIcon icon={faXmarkCircle} />
                        :
                        <FontAwesomeIcon icon={faCheckCircle} />
                        }
                        <p>{popup.message}</p>   
                        
                    </div>
                )
            })}
        </div>
    )
}

export default FloatingPopup