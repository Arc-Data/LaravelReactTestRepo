import { Link, NavLink, Outlet } from "react-router-dom"
import UserNav from "../components/UserNav"

const SettingsLayout = () => {
    return (
        <>
            <UserNav />
            <div className="container mx-auto mt-12 grid md:grid-cols-[200px,auto] py-12">
                <nav className="flex mt-12 md:flex-col">
                    <NavLink 
                        to={"settings/profile"} 
                        className={nav => {
                            return `${nav.isActive && "active"} text-white hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2` 
                        }}
                    >Profile</NavLink>
                    <NavLink 
                        to={"settings/blocked"} 
                        className={nav => {
                            return `${nav.isActive && "active"} text-white hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2` 
                        }} 
                    >Blocked Accounts</NavLink>
                </nav>
                <div className="md:px-12 md:border-l border-slate-800">
                    <Outlet />  
                </div>
            </div>
        </>
    )
}

export default SettingsLayout