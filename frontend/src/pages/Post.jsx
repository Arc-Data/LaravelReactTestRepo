import { useContext } from "react";
import UserNav from "../components/UserNav"
import usePostManager from "../hooks/usePostManager";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const { authToken, loading } = useContext(AuthContext)
    const { createPost } = usePostManager(authToken)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({
            'title': e.target.title.value,
            'description': e.target.description.value,
        })

        navigate('/')
    }

    return (
        <div>
            <UserNav />
            <form 
                action="" 
                method="POST"
                onSubmit={handleSubmit} 
                className="container flex flex-col gap-8 p-12 mx-auto bg-gray-700 rounded shadow bg-opacity-20">
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Enter post title"
                        className="w-full px-3 py-2 bg-transparent border rounded-md border-slate-400"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        name="description" 
                        rows={6}
                        placeholder="Write post description..."
                        className="w-full px-3 py-2 bg-transparent border rounded-md border-slate-400"/>
                </div>
                <div className="flex justify-center">
                    <button className="w-40 px-4 py-3 bg-blue-500 rounded-xl">Publish</button>
                </div>
            </form>
        </div>
    )
}

export default Post