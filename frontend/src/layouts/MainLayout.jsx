import { Link, Outlet, useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom"
import UserNav from "../components/UserNav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faSignal } from "@fortawesome/free-solid-svg-icons"

const MainLayout = () => {
    const navigate = useNavigate()
    
    return (
        <> 
            <UserNav />
            <div className="container mx-auto mt-12 grid md:grid-cols-[200px,auto] bg-background py-12" > 
                <div className="hidden gap-2 px-2 text-lg border-r md:flex md:flex-col border-slate-900">
                    <nav className="flex flex-col gap-2 text-sm md:sticky md:top-28 ">
                        <div className="flex items-center gap-4 px-6 py-2 border hover:text-primary hover:bg-slate-800 hover:cursor-pointer border-slate-800 text-md rounded-xl " onClick={() => {
                            navigate('/')
                            window.scrollTo(0, 0)
                        }}>
                            <FontAwesomeIcon icon={faHome} />
                            <p>Home</p>
                        </div>
                        <div to="/" className="flex items-center gap-4 px-6 py-2 border border-slate-800 text-md rounded-xl hover:cursor-pointer hover:text-primary hover:bg-slate-800" onClick={() => {
                            navigate('/?type=all')
                            window.scrollTo(0, 0)
                        }}>
                            <FontAwesomeIcon icon={faSignal} />
                            <p>All</p>
                        </div>
                    </nav>
                    {/*                      <div>
                        <Link to="/" className="">Home</Link>
                    </div>
                    <div>
                        <Link to="/" className="">Home</Link>
                    </div>
                    <div>
                        <Link to="/" className="">Home</Link>
                    </div> */}

                </div>
                <div className="md:px-12">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MainLayout