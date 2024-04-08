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
    const { post, loading, getPost, deletePost } = usePostManager(authToken)
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)
    
    const navigate = useNavigate()

    const toggleDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }

    const handleDelete = async () => {
        deletePost(id)
        navigate('/')
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
                <div className="flex gap-4 *:text-slate-800 *:hover:cursor-pointer *p-6">
                    <FontAwesomeIcon icon={faPencilAlt} className="hover:text-white"/>
                    <FontAwesomeIcon icon={faTrash} className="hover:text-white" onClick={toggleDeleteModal}/>
                </div>
                }
            </div>
            <div className="p-12 bg-gray-700 border border-transparent rounded shadow bg-opacity-20 hover:border-blue-800 ">
                <div className="flex justify-between">
                    <p className='mb-2 text-sm text-slate-600 hover:text-slate-200 hover:cursor-pointer'>{post.user.name}</p>
                    <p className='mb-2 text-sm text-slate-600 hover:text-slate-200 hover:cursor-pointer'>{dayjs(post.created_at).format("MMM D, YYYY h:mm A")}</p>
                </div>
                <p className="text-4xl font-bold">{post.title}</p>
                <p className="mt-4">{post.description}</p>
            </div>
            {showDeleteModal && <DeleteModal closeModal={toggleDeleteModal} handleDelete={handleDelete}/>}
        </div>
    )
}

export default PostDetail