import { motion } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function OpeningScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home")
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="h-screen bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="bg-white text-primary w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
          GN
        </div>

        <h1 className="text-3xl font-semibold mb-3">
          Welcome to Smart GN Digital Services
        </h1>

        <p className="text-gray-100">
          Serving your village digitally and efficiently.
        </p>
      </motion.div>

    </div>
  )
}

export default OpeningScreen
