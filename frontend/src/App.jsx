import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoutes from "./utils/PrivateRoutes"
import BaseRoutes from "./utils/BaseRoutes"
import CreatePost from "./pages/CreatePost"
import PostDetail from "./pages/PostDetail"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

function App() {
return (
  <BrowserRouter>
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
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/profile/:name" element={<Profile/>} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
}

export default App
