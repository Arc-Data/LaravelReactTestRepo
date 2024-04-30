import { useSearchParams } from "react-router-dom"

const Search = () => {
    const [ searchParams, setSearchParams ] = useSearchParams()

    return (
        <div>
            <div className="flex items-center pb-4 border-b border-slate-800">
                <div className="flex gap-4 ml-8 *:px-4 *:py-2 *:rounded-xl">
                    <button className="" onClick={() => {
                        searchParams.set('type', 'post')
                        setSearchParams(searchParams)
                    }}>Post</button>
                    <button className="" onClick={() => {
                        searchParams.set('type', 'user')
                        setSearchParams(searchParams)
                    }}>User</button>
                </div>
            </div>
        </div>
    )
}

export default Search