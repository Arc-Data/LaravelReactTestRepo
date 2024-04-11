import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const UserNav = () => {
	const { user, logoutUser } = useContext(AuthContext)

	return (
		<div className="fixed top-0 left-0 z-10 w-full p-4 bg-blue-600 shadow-xl ">
			<nav className="container flex items-center justify-between mx-auto">
				<Link to="/">WriteUps</Link>
				{!user ?   
				<div className="flex gap-8">
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
				:
				<div className="flex gap-8">
					<Link to={`/profile/${user.username}`}>
						{user.profile_image ? 
						<img src={user.profile_image} className="object-cover w-10 h-10 border border-gray-800 rounded-full shadow" alt="" />
						:
						<div className="w-10 h-10 overflow-hidden rounded-full">
							<FontAwesomeIcon icon={faUser} className="w-10 h-10 border border-gray-800 bg-slate-800"/>
						</div>
						}
					</Link>
					<button onClick={logoutUser}>Logout</button>
				</div>
				}
			</nav>
		</div>
	)
}

export default UserNav