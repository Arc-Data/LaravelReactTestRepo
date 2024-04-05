import { Link, Outlet } from "react-router-dom"
import UserNav from "../components/UserNav"

const MainLayout = () => {
  return (
    <> 
        <UserNav />
        <div className="container mx-auto mt-20 grid md:grid-cols-[200px,auto]"> 
            <nav className="hidden gap-2 text-lg border-r md:flex md:flex-col border-slate-900">
                {/* <div>
                    <Link to="/" className="">Home</Link>
                </div>
                <div>
                    <Link to="/" className="">Home</Link>
                </div>
                <div>
                    <Link to="/" className="">Home</Link>
                </div>
                <div>
                    <Link to="/" className="">Home</Link>
                </div> */}

            </nav>
            <div className="px-12 py-12">
                <Outlet />
            </div>
        </div>
    </>
  )
}

export default MainLayout