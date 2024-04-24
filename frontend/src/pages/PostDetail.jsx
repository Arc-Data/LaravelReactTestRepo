import { useContext, useEffect, useState } from "react"
import PostContext from "../context/PostContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faMessage, faPencilAlt, faRetweet, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../context/AuthContext"
import dayjs from '../utils/dayjs'
import Spinner from "../components/Spinner"
import DeleteModal from "../modals/DeleteModal"
import usePostManager from "../hooks/usePostManager"
import Comment from "../components/Comment"
import InfiniteScroll from "react-infinite-scroll-component"
import PostEnd from "../components/PostEnd"

const PostDetail = () => {
    const { id } = useParams()
    const { user, authToken } = useContext(AuthContext)
    const { 
        post, 
        commentsLoading, 
        rootComments,
        editPost,
        addLocalComment,
        editedPost,
        handleEditedPostChange,
        fetchMoreComments,
        hasMoreComments,
        commentsLength,
    } = useContext(PostContext)
    const { 
        likePost,
        deletePost, 
    } = usePostManager(authToken)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ likes, setLikes ] = useState(0)
    const [ isLiked, setIsLiked ] = useState(false)
    const [ content, setContent ] = useState('') 
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)

    const navigate = useNavigate()

    const toggleEditing = () => {
        setIsEditing(prev => !prev)
    }

    const toggleDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }

    const handleDelete = () => {
        deletePost(id)
        navigate('/')
    }

    const handleEditPost = async (e) => {
        e.preventDefault()
        const editedDescription = e.target.description.value.replace(/\n/g, '<br />');
        await editPost(id, {
            title: e.target.title.value,
            description: editedDescription
        })
        toggleEditing()
    }

    const handleSubmitLike = async (e) => {
        e.stopPropagation()
        const num = isLiked ? -1 : 1
        likePost(id)
        setLikes(prev => prev + num)
        setIsLiked(prev => !prev)
    }

    const handleRepost = (e) => {
        e.stopPropagation()
    }

    const handleContentInputChange = (e) => {
        setContent(e.target.value)
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        await addLocalComment(e.target.value)
        setContent('')
    }

    useEffect(() => {
        if (!post) return
        setLikes(post.likes)
        setIsLiked(post.isLiked)
    }, [post])

    return (
        <div className="flex flex-col gap-8">
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
                    <div className="flex gap-4">
                        <Link to={`/profile/${post.user.name}`} className=''>
                            <img src={post.user.profile_image} alt="" className="object-cover w-8 h-8 rounded-full"/>
                        </Link>
                        <div className="w-full">
                            <div className="flex justify-between">
                                <Link to={`/profile/${post.user.name}`} className="text-md hover:text-underline hover:text-primary">{post.user.name}</Link>
                                <p className='mb-2 text-sm text-slate-600 '>{dayjs(post.created_at).format("MMM D, YYYY h:mm A")}</p>
                            </div>
                            {isEditing ?
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
                                        className="w-full px-2 py-3 whitespace-pre-wrap bg-transparent border border-slate-800"
                                        rows={4} 
                                        value={editedPost.description.replace(/<br\s*\/?>/gi, '\n')} 
                                        onChange={handleEditedPostChange}/>
                                </div>
                                <div className="flex *:flex-1 *:py-2 mt-8 *:border gap-4 *:rounded-md ">
                                    <button onClick={toggleEditing} className="hover:bg-white hover:text-slate-900">Cancel</button>
                                    <button type="submit" className="bg-blue-700 border-transparent bg-opacity-20 hover:bg-opacity-80">Edit</button>
                                </div>
                            </form>
                            :
                            <>
                            <p className="mt-6 text-4xl font-bold">{post.title}</p>
                            <p className="mt-4" dangerouslySetInnerHTML={{ __html: post.description}} />
                            </>
                            }
                            <div className='flex gap-4 mt-2'>
                                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl' onClick={handleSubmitLike}>
                                    <FontAwesomeIcon icon={faThumbsUp}  className={` group-hover/likes:text-primary ${isLiked ? 'text-primary' : 'text-black'}`}/>
                                    <p className='text-sm text-slate-400'>{likes}</p>
                                </button>
                                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl'>
                                    <FontAwesomeIcon icon={faMessage}  className='text-black text-opacity-40 group-hover/likes:text-primary'/>
                                    <p className='text-sm text-slate-400'>{commentsLength}</p>
                                </button>
                                <button className='flex items-center gap-4 px-2 py-2 shadow-md group/likes bg-opacity-10 bg-primary rounded-xl' onClick={handleRepost}>
                                    <FontAwesomeIcon icon={faRetweet}  className='text-black text-opacity-40 group-hover/likes:text-primary'/>
                                    <p className='text-sm text-slate-400'>100</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form action="POST" className="px-12"  >
                <input 
                    type="text"
                    placeholder="Add a comment..." 
                    name="content"
                    value={content}
                    onChange={handleContentInputChange}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            handleCommentSubmit(e);
                        }
                    }}
                    className="w-full px-4 py-2 bg-transparent border rounded-full border-slate-600" />
            </form>
            <div className="pl-12">
                <InfiniteScroll 
                    dataLength={rootComments.length}
                    next={fetchMoreComments}
                    hasMore={hasMoreComments}
                    loader={<Spinner />}
                    endMessage={<PostEnd />}>
                    {rootComments && rootComments.map(comment => {
                        return (<Comment key={comment.id} comment={comment} />)
                    })}
                </InfiniteScroll>
            </div>
            {showDeleteModal && <DeleteModal closeModal={toggleDeleteModal} handleDelete={handleDelete}/>}
        </div>
    )
}

export default PostDetail