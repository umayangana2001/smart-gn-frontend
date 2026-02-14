import { Routes, Route } from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import Home from "./pages/public/Home"
import About from "./pages/public/About"
import Services from "./pages/public/Services"
import OpeningScreen from "./pages/public/OpeningScreen"

function App() {
  return (
    <Routes>

      {/* Opening screen */}
      <Route path="/" element={<OpeningScreen />} />

      {/* Public Layout */}
      <Route element={<PublicLayout />}>

        {/* Make Home also accessible at /home */}
        <Route path="/home" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

      </Route>
    </Routes>
  )
}

export default App
