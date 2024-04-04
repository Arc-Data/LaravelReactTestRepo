import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoutes from "./utils/PrivateRoutes"
import BaseRoutes from "./utils/BaseRoutes"

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
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
}

export default App
