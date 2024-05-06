import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const UserNotFound = () => {
    return (
        <div className="w-full p-20 text-center">
            <FontAwesomeIcon icon={faUser} className="text-8xl text-secondary" />
            <p className="mt-8 text-xl">User does not exist. </p>
            <Link to="/" className="text-sm underline text-primary">Back to homepage</Link>
        </div>
    )
}

export default UserNotFound