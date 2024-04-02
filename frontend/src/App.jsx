import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"

function App() {
  console.log("App initialized")  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
