import { useContext, useState } from "react";
import UserNav from "../components/UserNav"
import usePostManager from "../hooks/usePostManager";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
    const { user, authToken } = useContext(AuthContext)
    const { createPost } = usePostManager(authToken)
    const [ images, setImages ] = useState([])
    const [ previewImages, setPreviewImages ] = useState([])
    const navigate = useNavigate()

    console.log(previewImages)

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)

        const previews = []
        files.forEach(file => {
            previews.push(URL.createObjectURL(file))
        })

        setPreviewImages(prev => [...prev, ...previews])
        setImages(prev => [...prev, ...files])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({
            'title': e.target.title.value,
            'description': e.target.description.value,
        })

        navigate('/')
    }

    return (
        <div className="mt-4">
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
                <p>Upload Images</p>
                <div className="flex gap-4 overflow-x-auto ">
                    {previewImages.map(image => {
                        return (
                            <img src={image} className="object-cover w-36 h-36"/>
                        )
                    })}
                    <div>
                        <label 
                            htmlFor="dropzone-image" 
                            className="flex flex-col border border-gray-300 border-dashed w-36 h-36">
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-text">
                                    <FontAwesomeIcon icon={faImage} className="text-4xl" />
                                    <p className="mb-2 text-sm">Upload image files</p>
                                </div>
                            </div>
                        </label>
                        <input 
                            type="file" 
                            className="hidden" 
                            id="dropzone-image" 
                            name="image" 
                            onChange={handleImageChange} 
                            multiple />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="w-40 px-4 py-3 bg-blue-500 rounded-xl">Publish</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost