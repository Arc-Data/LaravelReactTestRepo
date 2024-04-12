const Comment = ({ comment }) => {
    console.log(comment)

    return (
        <div className="flex gap-4 px-12 py-2">
            <img src={comment.user.profile_image} alt="" className="object-cover w-8 h-8 rounded-full" />
            <div className="p-1">
                <span className="text-md text-slate-600">{comment.user.name}</span>
                <p className="mt-4">{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment