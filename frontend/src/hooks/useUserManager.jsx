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
    const [ hasMoreUsers, setHasMoreUsers ] = useState(false)
    const { updateTokenOnUserUpdate } = useContext(AuthContext)

    const getUser = async (id) => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/user/${id}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            setUser(response.data.data)
            setLoading(false)
            
            return response.data.data
        }
        catch(error) {
            console.log(error)
            setStatus("404")
        }
        setLoading(false)
    }

    const blockUser = async (id) => {
        try {
            const response = await axios.post(`/api/user/${id}/block`, null, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            addPopup(response.data.message)
        }
        catch (error) {
            console.log(error)
            addPopup(error.response.data.message)
        }
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

    const getBlockedUsers = async () => {
        try {
            const url = `/api/user/blocks?page=${currentPage}`
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
        catch (error) {
            console.log(error)
            addPopup(error.response.data.message)
        }
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
    
    const notifyMe = async (id) => {
        try {
            const response = await axios.post(`/api/user/${id}/notify`, null, {
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                }
            })

            addPopup(response.data.message)
            console.log(response)
        }
        catch (error) {
            console.log(error)
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
        getBlockedUsers,
        hasMoreUsers,
        notifyMe,
        blockUser,
    }
}

export default useUserManager