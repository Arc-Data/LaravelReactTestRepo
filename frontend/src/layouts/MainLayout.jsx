import { Link, Outlet } from "react-router-dom"
import UserNav from "../components/UserNav"

const MainLayout = () => {
  return (
    <> 
        <UserNav />
        <div className="container mx-auto mt-20 grid md:grid-cols-[200px,auto]"> 
            <nav className="flex-col hidden gap-2 text-lg border-r md:flex md:block border-slate-900">
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
            <Outlet />
        </div>
    </>
  )
}

export default MainLayout