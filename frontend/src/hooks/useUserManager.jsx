import { useContext, useState } from "react"
import axios from "../axios"
import AuthContext from "../context/AuthContext"
import SystemPopupsContext from "../context/SystemPopupsContext"

const useUserManager = (authToken) => {
    const { addPopup } = useContext(SystemPopupsContext)
    const [ user, setUser ] = useState()
    const [ users, setUsers ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState()  
    const [ currentPage, setCurrentPage] = useState(1)
    const [ hasMoreUsers, setHasMoreUsers ] = useState(true)
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
            addPopup(error.response.data.message, "error")
        }
        setLoading(false)
    }

    const getUserFollowings = async (id) => {
        setLoading(true)

        try {
            const url = `/api/user/${id}/followings?page=${currentPage}`
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            setUsers(prevUsers => [...prevUsers, ...response.data.data])

            if(response.data.links && response.data.links.next) {
                setCurrentPage(prev => prev + 1)
                setHasMoreUsers(true)
            } else {
                setHasMoreUsers(false)
            }
        }
        catch(error) {
            addPopup(error.response.data.messages, "error")
        }

        setLoading(false)
    }

    const getUserFollowers = async (id) => {
        setLoading(true)
        
        try {
            const url = `/api/user/${id}/followers?page=${currentPage}`
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            setUsers(prevUsers => [...prevUsers, ...response.data.data])
        
            if (response.data.links && response.data.links.next) {
                setCurrentPage(prev => prev + 1)
                setHasMoreUsers(true)
            } else {
                setHasMoreUsers(false)
            }
        }
        catch(error) {
            addPopup(error.response.data.messages, "error")
        }

        setLoading(false)
    }

    const followUser = async (id) => {
        try {
            const response = await axios.post(`/api/user/${id}/follow`, null, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
        }
        catch (error) {
            addPopup(error.response.data.message, "error")
        }
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
            addPopup("Profile Updated.")
            updateTokenOnUserUpdate(response.data.token)
        }
        catch (error) {
            addPopup(error.response.data.message, "error")
        }
    }

    return {
        user, 
        users, 
        loading,
        status,
        getUser,
        editUser,
        followUser,
        getUserFollowings,
        getUserFollowers,
        hasMoreUsers,
    }
}

export default useUserManager