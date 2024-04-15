import { Link } from "react-router-dom"

const Comment = ({ comment }) => {
    return (
        <div className="flex gap-4 px-12 py-2">
            <Link to={`/profile/${comment.user.name}`}>
                <img src={comment.user.profile_image} alt="" className="object-cover w-8 h-8 rounded-full" />
            </Link>
            <div className="p-1">
                <Link to={`/profile/${comment.user.name}`} className="text-md text-slate-600 hover:text-white">{comment.user.name}</Link>
                <p className="mt-4">{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment