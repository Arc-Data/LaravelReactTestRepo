import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom"

const PrivateRoutes = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])


    return user && (<Outlet />)
}

export default PrivateRoutes