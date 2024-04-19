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
import FloatingNotification from "./components/FloatingNotification"
import { PostProvider } from "./context/PostContext"
import PostTest from "./pages/PostDetail"
import PostDetail from "./pages/PostDetail"

function App() {
return (
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
        <Routes>
          <Route element={<BaseRoutes />} >
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes/>}>
              <Route element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<CreatePost />} />
                <Route path="/profile/:name" element={<Profile/>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/post/:id" element={
                  <PostProvider>
                    <PostDetail />
                  </PostProvider>
                } />
              </Route>
          </Route>
        </Routes>
        <FloatingNotification />
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
)
}

export default App
