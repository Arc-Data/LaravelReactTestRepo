import { useContext, useState } from "react"
import axios from "../axios"
import AuthContext from "../context/AuthContext"
import NotificationContext from "../context/NotificationContext"

const useUserManager = (authToken) => {
    const { addNotification } = useContext(NotificationContext)
    const [ user, setUser ] = useState()
    const [ users, setUsers ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState()  
    const { updateTokenOnUserUpdate } = useContext(AuthContext)

    const getUser = async (name) => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/user/${name}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setUser(response.data.data)
            setLoading(false)
            return response.data.data
        }
        catch(error) {
            addNotification(error.response.data.message, "error")
        }
        setLoading(false)
    }

    const editUser = async (data) => {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value !== user[key]) {
                formData.append(key, value);
            }
        });

        try {
            const response = await axios.post('/api/user/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setUser(response.data.user)
            addNotification("Profile Updated.")
            updateTokenOnUserUpdate(response.data.token)
        }
        catch (error) {
            addNotification(error.response.data.message, "error")
        }
    }

    return {
        user, 
        users, 
        loading,
        status,
        getUser,
        editUser,
    }
}

export default useUserManager