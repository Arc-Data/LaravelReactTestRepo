import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons"
import NotificationContext from "../context/NotificationContext"

const UserNav = () => {
	const { user, logoutUser } = useContext(AuthContext)
	const { hasUnreadNotifications } = useContext(NotificationContext)

	return (
		<div className="fixed top-0 left-0 z-10 w-full p-4 border-b shadow-xl border-slate-900 bg-background">
			<nav className="container flex items-center justify-between mx-auto">
				<Link to="/" className="text-2xl font-bold text-primary">WriteUps</Link>
				{!user ?   
				<div className="flex gap-8">
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
				:
				<div className="flex items-center gap-8">
					<Link to="/notifications" className="relative flex items-center justify-center w-8 h-8 p-5 rounded-full hover:bg-opacity-20 hover:cursor-pointer hover:bg-primary">
						<FontAwesomeIcon icon={faBell} className="text-xl"/>
						<div className={`${hasUnreadNotifications ? "absolute" : "hidden" } top-0 right-0 z-10 w-4 h-4 rounded-full bg-primary`}></div>
					</Link>
					<Link to={`/profile/${user.id}`}>
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