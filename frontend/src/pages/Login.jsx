import UserNav from "../components/UserNav"

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Data Submitted")
    }

    return (
        <>
            <UserNav />
            <div className="grid h-screen mx-auto text-black place-items-center ">
                <form className="p-4 bg-blue-900 rounded shadow-xl" method="POST" onSubmit={handleSubmit}>
                    <p className="text-center text-white">Login</p>
                    <label htmlFor="username" className="block">Username</label>
                    <input type="text" name="username"/>
                    <label htmlFor="password" className="block">Password</label>
                    <input type="password" name="password"/>
                    <button type="submit">Button</button>
                </form>
            </div>
        </>
    )
}

export default Login