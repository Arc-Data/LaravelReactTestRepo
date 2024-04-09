import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import usePostManager from "../hooks/usePostManager"
import Spinner from "../components/Spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import DeleteModal from "../modals/DeleteModal"
import dayjs from 'dayjs'

const PostDetail = () => {
    const { id } = useParams()
    const { authToken, user } = useContext(AuthContext)
    const { post, loading, getPost, deletePost, editedPost, handleEditedPostChange, cancelEdit, editPost } = usePostManager(authToken)
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)
    const [ isEditing, setEditing ] = useState(false)

    const navigate = useNavigate()

    const handleCancelEditing = (e) => {
        e.preventDefault()
        toggleEditing()
    }

    const handleEditPost = async (e) => {
        e.preventDefault();
        await editPost(id, {
            title: e.target.title.value, 
            description: e.target.description.value
        })
        toggleEditing()
    }

    const toggleDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }

    const handleDelete = async () => {
        deletePost(id)
        navigate('/')
    }

    const toggleEditing = () => {
        const prevEditState = isEditing
        setEditing(prev => !prev)

        if (prevEditState) cancelEdit()
    }

    useEffect(() => {
        const retrievePost = async () => {
            await getPost(id) 
        }

        retrievePost()
    }, [id])

    if (loading) {
        return (<Spinner />)
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4 *:px-4 *:py-2">
                <Link to ="/" className="text-sm text-gray-500 transition border rounded shadow border-slate-800 hover:bg-white">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                    <span>Go Back</span>
                </Link>
                {post.user.id === user.id && 
                <div className="flex gap-2 *:text-slate-800 *:hover:cursor-pointer *p-6">
                    <div className="grid w-8 h-8 rounded-full place-items-center hover:shadow group">
                        <FontAwesomeIcon icon={faPencilAlt} className="group-hover:text-white" onClick={toggleEditing}/>
                    </div>
                    <div className="grid w-8 h-8 rounded-full place-items-center hover:bg-gray-950">
                        <FontAwesomeIcon icon={faTrash} className=" hover:text-white" onClick={toggleDeleteModal}/>
                    </div>
                </div>
                }
            </div>
            <div className="p-12 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 ">
                <div className="flex justify-between">
                    <Link to={`/profile/${post.user.name}`} className='mb-2 text-sm text-slate-600 hover:text-slate-200 hover:cursor-pointer'>{post.user.name}</Link>
                    <p className='mb-2 text-sm text-slate-600 '>{dayjs(post.created_at).format("MMM D, YYYY h:mm A")}</p>
                </div>
                {isEditing ?
                    <>
                    <form action="POST" className="grid gap-4" onSubmit={handleEditPost}>
                        <div>
                            <input 
                                type="text" 
                                name="title" 
                                className="w-full px-2 py-3 bg-transparent border rounded border-slate-800"
                                value={editedPost.title}
                                onChange={handleEditedPostChange}/>
                        </div>
                        <div>
                            <textarea 
                                name="description"
                                className="w-full px-2 py-3 bg-transparent border border-slate-800"
                                rows={4} 
                                value={editedPost.description}
                                onChange={handleEditedPostChange}/>
                        </div>
                        <div className="flex *:flex-1 *:py-2 mt-8 *:border gap-4 *:rounded-md ">
                            <button onClick={handleCancelEditing} className="hover:bg-white hover:text-slate-900">Cancel</button>
                            <button type="submit" className="bg-blue-700 border-transparent bg-opacity-20 hover:bg-opacity-80">Edit</button>
                        </div>
                    </form>
                    </>
                    :
                    <>
                    <p className="text-4xl font-bold">{post.title}</p>
                    <p className="mt-4">{post.description}</p>
                    </>
                }
            </div>
            {showDeleteModal && <DeleteModal closeModal={toggleDeleteModal} handleDelete={handleDelete}/>}
        </div>
    )
}

export default PostDetail