import { useState } from "react"
import axios from "../axios"

const useUserManager = (authToken) => {
    const [ user, setUser ] = useState()
    const [ users, setUsers ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState()  

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

    const editUser = async () => {
        console.log("Edited User")
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