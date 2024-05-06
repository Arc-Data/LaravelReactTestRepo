import { useSearchParams } from "react-router-dom"

const UserWithNameNotFound = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("query")
    
    return (
        <div className="py-12 pl-24">
            <p className="text-2xl">No users with name of "{query}" exists.</p>
        </div>
    )
}

export default UserWithNameNotFound