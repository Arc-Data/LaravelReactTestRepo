import { Link } from "react-router-dom"
import dayjs from "../utils/dayjs"

const Comment = ({ comment }) => {
    return (
        <div className="flex gap-4 px-12 py-2">
            <Link to={`/profile/${comment.user.name}`}>
                <img src={comment.user.profile_image} alt="" className="object-cover w-8 h-8 rounded-full" />
            </Link>
            <div className="p-1">
                <div className="flex items-center gap-2">
                    <Link to={`/profile/${comment.user.name}`} className="text-md text-slate-600 hover:text-white">{comment.user.name}</Link>
                    <span className="text-slate-800">&middot;</span>
                    <span className="text-sm text-secondary">{dayjs(comment.created_at).fromNow()}</span>
                </div>
                <p className="mt-4">{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment