import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const PostNotFound = () => {
    return (
        <div className="flex flex-col justify-center p-20 text-center">
            <FontAwesomeIcon icon={faCircleExclamation} className="text-primary text-8xl"/>
            <p className="mt-8 text-slate-600">This post does not exist or may have been deleted.</p>
            <Link to="/" className="text-primary underline text-sm">Go back to homepage</Link>
        </div>
    )
}

export default PostNotFound