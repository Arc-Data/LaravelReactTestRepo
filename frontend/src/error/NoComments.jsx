import { faCommentSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NoComments = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <FontAwesomeIcon icon={faCommentSlash} className="text-slate-800 text-8xl"/>
            <p className="mt-6 text-slate-800">This post has no comments yet.</p>
            <p className="mt-2 text-slate-800">Be the first to comment something</p>
        </div>
    )
}

export default NoComments