import { useContext, useState } from "react"
import UserNav from "../components/UserNav"
import AuthContext from "../context/AuthContext"

const Login = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const { loginUser, updateToken } = useContext(AuthContext)
    
    const [formData, setFormData] = useState({
        'email_or_username': '',
        'password': '',
    })

    const handleClick = () => {
        updateToken()
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Data Submitted")
        loginUser(formData);
    }

    return (
        <>
            <UserNav />
            <div className="grid w-screen h-screen md:grid-cols-[1fr_800px] overflow-hidden">
                <div></div>
                <div className="bg-white shadow-xl">
                    <button 
                        onClick={updateToken}
                        className="px-2 py-3 mt-20 rounded shadow bg-slate-900 w-60">Login</button>
                    
                    <form action="" method="POST" className="px-20 py-40" onSubmit={handleSubmit}>
                        <h1 className="mb-12 text-5xl font-bold text-blue-600">Login</h1>
                        <div className="my-2">
                            <label htmlFor="username" className="text-gray-700">Enter Email or Username</label>
                            <input 
                                type="text" 
                                name="email_or_username"
                                placeholder="Enter username"
                                value={formData.email_or_username}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 mt-2 mb-4 text-black bg-transparent border border-gray-500 rounded "/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="text-gray-700">Password</label>
                            <input 
                                type="password" 
                                name="password"
                                placeholder="*************"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 mt-2 mb-4 text-black bg-transparent border border-gray-500 rounded "/>
                        </div>
                        <div className="flex gap-2 text-gray-700">
                                <input type="checkbox" />
                                <p>Remember my password</p>
                        </div>
                        <button className="px-2 py-3 mt-20 rounded shadow bg-slate-900 w-60">Login</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login