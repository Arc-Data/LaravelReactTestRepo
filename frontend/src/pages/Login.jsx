import { useContext, useState } from "react"
import UserNav from "../components/UserNav"
import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner"

const Login = () => {
    const { loginUser, updateToken } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)   
    const [formData, setFormData] = useState({
        'email_or_username': '',
        'password': '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        await loginUser(formData);
        setLoading(false)
    }

    return (
        <>
            <UserNav />
            <div className="grid w-screen h-screen md:grid-cols-[1fr_800px] overflow-hidden">
                <div></div>
                <div className="bg-white shadow-xl">
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
                        {loading ? 
                        <Spinner/>
                        :
                        <button className="px-2 py-3 mt-20 rounded shadow bg-slate-900 w-60">
                            Login
                        </button>
                        }
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login