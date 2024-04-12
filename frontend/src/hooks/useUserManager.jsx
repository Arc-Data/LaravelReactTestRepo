import { useContext, useState } from "react"
import axios from "../axios"
import AuthContext from "../context/AuthContext"

const useUserManager = (authToken) => {
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
            console.log("An error occured while fetching user profile. ", error)
        }
        setLoading(false)
    }

    const editUser = async (data) => {
        console.log(data)
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value !== user[key]) {
                console.log("Only changing", key, value)
                formData.append(key, value);
            }
        });

        for (let pair of formData.entries()) {
            console.log("Added : ", pair[0], pair[1])
        }

        try {
            const response = await axios.post('/api/user/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setUser(response.data.user)
            updateTokenOnUserUpdate(response.data.token)
        }
        catch (error) {
            console.log("An error occured while updating user data: ", error)
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