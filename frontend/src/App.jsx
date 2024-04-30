import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoutes from "./utils/PrivateRoutes"
import BaseRoutes from "./utils/BaseRoutes"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import { NotificationProvider } from "./context/NotificationContext"
import { PostProvider } from "./context/PostContext"
import PostDetail from "./pages/PostDetail"
import Notifications from "./pages/Notifications"
import { SystemPopupsProvider } from "./context/SystemPopupsContext"
import FloatingPopup from "./components/FloatingPopup"
import ProfileLayout from "./layouts/ProfileLayout"
import Following from "./pages/Following"
import Followers from "./pages/Followers"
import Search from "./pages/Search"

function App() {
return (
  <BrowserRouter>
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route element={<BaseRoutes />} >
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
          </Route>
          <Route element={
            <SystemPopupsProvider>
              <PrivateRoutes/>
              <FloatingPopup />
            </SystemPopupsProvider>
          }>
              <Route element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<CreatePost />} />
                <Route element={<ProfileLayout />}>
                  <Route path="/profile/:id" element={<Profile/>} />
                  <Route path="/profile/:id/following" element={<Following/>} />
                  <Route path="/profile/:id/followers" element={<Followers/>} />
                </Route>
                <Route path="/settings" element={<Settings />} />
                <Route path="/post/:id" element={
                  <PostProvider>
                    <PostDetail />
                  </PostProvider>
                } />
                <Route path="/notifications" element={<Notifications />}/>
                <Route path="/search" element={<Search />}/>
              </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </AuthProvider> 
  </BrowserRouter>
)
}

export default App
