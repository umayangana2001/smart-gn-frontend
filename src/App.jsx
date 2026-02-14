import { Routes, Route } from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import Home from "./pages/public/Home"
import About from "./pages/public/About"
import Services from "./pages/public/Services"
import OpeningScreen from "./pages/public/OpeningScreen"

function App() {
  return (
    <Routes>
      {/* Opening Screen First */}
      <Route path="/" element={<OpeningScreen />} />

      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Route>
    </Routes>
  )
}

export default App
