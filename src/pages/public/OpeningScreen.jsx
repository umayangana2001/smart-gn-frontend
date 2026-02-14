import { motion } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo/smart-gn-logo.png"
import bgImage from "../../assets/images/village-bg.jpg"

function OpeningScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home")
    }, 3500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div
      className="h-screen relative flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center px-6"
      >
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Smart GN Logo"
          className="w-28 h-28 rounded-full mx-auto mb-6 shadow-2xl object-cover"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
          Welcome to Smart GN Digital Services
        </h1>

        <p className="text-lg text-gray-200">
          Serving your village digitally and efficiently.
        </p>
      </motion.div>
    </div>
  )
}

export default OpeningScreen
