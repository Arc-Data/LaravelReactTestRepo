import { Link } from "react-router-dom"

const UserNav = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 bg-blue-600 shadow-xl ">
        <nav className="container flex justify-between mx-auto">
            <Link to="/">UserNav</Link>
            <div className="flex gap-8">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
        </nav>
    </div>
  )
}

export default UserNav