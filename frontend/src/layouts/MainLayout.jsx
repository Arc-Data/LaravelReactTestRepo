import { Link, Outlet } from "react-router-dom"
import UserNav from "../components/UserNav"

const MainLayout = () => {
  return (
    <> 
        <UserNav />
        <div className="container mx-auto mt-20 grid grid-cols-[200px,auto]"> 
            <nav className="flex flex-col gap-2 border-r border-slate-900 text-lg">
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