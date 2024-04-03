import { createContext, useEffect, useState } from "react";
import axios from "../axios";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null)
    const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null)

    const loginUser = async (data) => {
        try {
            const response = await axios.post(`/api/auth/login/`, data)
            const token = response.data.access_token
            const tokenData = jwtDecode(token)

            setUser(tokenData.user)
            setAuthToken(token)

            localStorage.setItem('authToken', token)
        } catch (error) {
            console.log("An error occured while logging in: ", error)
        }
    }

    const updateToken = async () => {
        try {
            const response = await axios.post('/api/auth/refresh/', null, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if (response.status == 200) {
                const token = response.data.access_token
                const tokenData = jwtDecode(token)

                setAuthToken(response.data.access_token)
                setUser(tokenData.user)
                
                localStorage.setItem('authToken', token)
            }
        }
        catch(error) {
            console.log("An error occured while refreshing token data", error)
        }
    }

    const logoutUser = (data) => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
    }

    const registerUser = (data) => {

    }

    const contextData = {
        loginUser,
        registerUser,
        logoutUser,
        updateToken,
        authToken,
        user,
    }

    useEffect(() => {
        const checkTokenExpiryAndRefresh = async () => {
            if (authToken) {
                const currentTimeInSeconds = Math.floor(Date.now() / 1000);
                const decodedToken = jwtDecode(authToken)

                if (decodedToken.exp && currentTimeInSeconds + 120 > decodedToken.exp) {
                    try {
                        await updateToken()
                    } catch (error) {
                        logoutUser()
                    }
                }
            }
        }

        checkTokenExpiryAndRefresh();
        const threeMinutes = 1000 * 60 * 3
        const intervalId = setInterval(checkTokenExpiryAndRefresh, threeMinutes)
    
        return () => clearInterval(intervalId)
    }, [authToken, updateToken])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}