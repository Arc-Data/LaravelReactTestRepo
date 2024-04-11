import { useState } from "react"

const FloatingNotification = ({ message }) => {
    const [ visible, setVisible ] = useState(true)

    return (
        <div className="fixed p-4 text-white bg-blue-500 bottom-4 right-4">{message}</div>
    )
}

export default FloatingNotification