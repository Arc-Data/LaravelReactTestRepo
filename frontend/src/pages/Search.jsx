import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "../axios"
import AuthContext from "../context/AuthContext"
import SystemPopupsContext from "../context/SystemPopupsContext"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../components/Spinner"
import PostEnd from "../components/PostEnd"
import UserListItem from "../components/UserListItem"
import Post from "../components/Post"
import UserWithNameNotFound from "../error/UserWithNameNotFound"
import PostWithDescriptionNotFound from "../error/PostWithDescriptionNotFound"

const Search = () => {
    const { authToken } = useContext(AuthContext)
    const { addPopup } = useContext(SystemPopupsContext)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ results, setResults ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ currentPage, setCurrentPage] = useState(1)
    const [ hasMoreData, setHasMoreData ] = useState(true)

    const query = searchParams.get("query")
    const type = searchParams.get("type")

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/search?page=${currentPage}&query=${query}&type=${type}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })

            setResults(prevResults => [...prevResults, ...response.data.data])

            if (response.data.links && response.data.links.next) {
                setHasMoreData(true)
                setCurrentPage(prev => prev + 1)
            } else {
                setHasMoreData(false)
            }

        }
        catch (error) {
            addPopup(error.response.data.message, "error")
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setCurrentPage(1)
        setResults([])
    }, [type])

    useEffect(() => {
        setLoading(true)
        fetchData()
    }, [query, type])





    return (
        <div>
            <div className="flex items-center pb-4 border-b border-slate-800">
                <div className="flex gap-4 ml-8 *:px-4 *:py-2 *:rounded-xl">
                    <button className={`${type === "post" ? "bg-primary" : ""}`} onClick={() => {
                        searchParams.set('type', 'post')
                        setSearchParams(searchParams)
                    }}>Post</button>
                    <button className={`${type === "user" ? "bg-primary" : ""}`} onClick={() => {
                        searchParams.set('type', 'user')
                        setSearchParams(searchParams)
                    }}>User</button>
                </div>
            </div>
            {loading ? 
            <Spinner />
            :
            <InfiniteScroll
                dataLength={results.length}
                next={fetchData}
                hasMore={hasMoreData}
                loader={<Spinner />}
                endMessage={<PostEnd />}
                >
                {
                    type === "user" && results.length === 0 ? 
                    <UserWithNameNotFound />
                    :
                    type === "user"
                    ?
                    results.map(user => {
                        return (
                            <UserListItem user={user} key={user.id} followDisabled={false}/>    
                        )
                    })
                    :
                    results.length === 0 ? 
                    <PostWithDescriptionNotFound />
                    :
                    <div className="flex flex-col gap-4">
                        {results.map(post => {
                            return (
                                <Post post={post} key={post.id}/>
                            ) 
                        })}
                    </div>
                }
            </InfiniteScroll>
            }
        </div>
    )
}

export default Search