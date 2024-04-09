import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const UserNav = () => {
	const { user, logoutUser } = useContext(AuthContext)

	return (
		<div className="fixed top-0 left-0 z-10 w-full p-4 bg-blue-600 shadow-xl ">
			<nav className="container flex justify-between mx-auto">
				<Link to="/">WriteUps</Link>
				{!user ?   
				<div className="flex gap-8">
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
				:
				<div className="flex gap-8">
					<Link to={`/profile/${user.username}`}>Profile</Link>
					<button onClick={logoutUser}>Logout</button>
				</div>
				}
			</nav>
		</div>
	)
}

export default UserNav