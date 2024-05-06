import { useSearchParams } from "react-router-dom"

const PostWithDescriptionNotFound = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("query")

    return (
        <div className="py-12 pl-24">
            <p className="text-2xl">Posts with description "{query}" not found.</p>
        </div>
    )
}

export default PostWithDescriptionNotFound