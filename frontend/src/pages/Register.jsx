import { useState } from "react"
import UserNav from "../components/UserNav"

const Register = () => {
    const [data, setData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'confirm': '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.password !== data.confirm) {
            alert('Passwords do not match')
            return
        }
        
        console.log(data)
        // insert register process
    }

    return (
        <>
            <UserNav />
            <div className="grid w-screen h-screen md:grid-cols-[1fr_800px] overflow-x-hidden">
                <div></div>
                <div className="text-black bg-white shadow-xl">
                    <form action="" method="POST" className="px-20 pt-40 pb-20 overflow-y-scroll" onSubmit={handleSubmit}>
                        <h1 className="mb-12 text-5xl font-bold text-blue-600">Register</h1>
                        <div className="my-2">
                            <label htmlFor="username" className="text-gray-700">Username</label>
                            <input 
                                type="text" 
                                name="username"
                                value={data.username}
                                onChange={handleInputChange}
                                placeholder="Enter username"
                                className="w-full px-2 py-1 mt-2 mb-4 text-black bg-transparent border border-gray-500 rounded "/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="email" className="text-gray-700">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                                placeholder="test@gmail.com"
                                className="w-full px-2 py-1 mt-2 mb-4 text-black bg-transparent border border-gray-500 rounded "/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="text-gray-700">Password</label>
                            <input 
                                type="password" 
                                name="password"
                                value={data.password}
                                onChange={handleInputChange}
                                placeholder="*************"
                                className="w-full px-2 py-1 mt-2 mb-4 text-black bg-transparent border border-gray-500 rounded "/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="confirm" className="text-gray-700">Confirm Password</label>
                            <input 
                                type="password" 
                                name="confirm"
                                value={data.confirm}
                                onChange={handleInputChange}
                                placeholder="*************"
                                className="w-full px-2 py-1 mt-2 mb-4 text-black bg-transparent border border-gray-500 rounded "/>
                        </div>
                        

                        <button className="px-2 py-3 mt-20 text-white rounded shadow bg-slate-900 w-60">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register