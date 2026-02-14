import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

function Home() {

  const slides = [
    {
      title: "Digital Grama Niladhari Services",
      description:
        "Access essential government services online with trust and efficiency.",
    },
    {
      title: "Submit Complaints Online",
      description:
        "Easily submit and track complaints directly to your village officer.",
    },
    {
      title: "Book Appointments Easily",
      description:
        "Schedule meetings with your GN officer conveniently.",
    },
    {
      title: "Track Your Service Requests",
      description:
        "Monitor the progress of your requests in real time.",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>

      {/* HERO SECTION WITH SLIDESHOW */}
      <section className="bg-linear-to-br from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side Animated Slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {slides[currentSlide].title}
              </h1>

              <p className="text-lg text-gray-100 mb-8">
                {slides[currentSlide].description}
              </p>

              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className="bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="bg-accent px-6 py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Side Visual Card */}
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">
                Serving Your Village Digitally
              </h2>
              <p className="text-gray-100">
                Submit complaints, book appointments, track requests,
                and access government services online with ease.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* SERVICES SECTION */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Our Digital Services
            </h2>
            <p className="text-gray-600">
              Access essential government services online with simplicity and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-primary"
            >
              <h3 className="font-semibold text-lg mb-3 text-primary">
                Complaint Submission
              </h3>
              <p className="text-gray-600 text-sm">
                Submit complaints directly to your Grama Niladhari officer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-secondary"
            >
              <h3 className="font-semibold text-lg mb-3 text-secondary">
                Appointment Booking
              </h3>
              <p className="text-gray-600 text-sm">
                Book appointments easily and manage your time efficiently.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-accent"
            >
              <h3 className="font-semibold text-lg mb-3 text-accent">
                Request Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Track the status of your service requests in real time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-primary"
            >
              <h3 className="font-semibold text-lg mb-3 text-primary">
                Secure Document Upload
              </h3>
              <p className="text-gray-600 text-sm">
                Upload and manage your official documents securely.
              </p>
            </motion.div>

          </div>

        </div>
      </section>
      {/* HOW IT WORKS SECTION */}
<section className="bg-white py-20">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-primary mb-4">
        How It Works
      </h2>
      <p className="text-gray-600">
        Simple steps to access digital government services.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-10 text-center">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="p-8 border rounded-xl shadow-sm hover:shadow-md transition"
      >
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
          1
        </div>
        <h3 className="font-semibold text-lg mb-3 text-primary">
          Register
        </h3>
        <p className="text-gray-600 text-sm">
          Create your account securely to access Smart GN services.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="p-8 border rounded-xl shadow-sm hover:shadow-md transition"
      >
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-secondary text-white flex items-center justify-center text-xl font-bold">
          2
        </div>
        <h3 className="font-semibold text-lg mb-3 text-secondary">
          Submit Request
        </h3>
        <p className="text-gray-600 text-sm">
          Submit complaints, service requests, or appointment bookings easily.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="p-8 border rounded-xl shadow-sm hover:shadow-md transition"
      >
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
          3
        </div>
        <h3 className="font-semibold text-lg mb-3 text-accent">
          Track & Receive Service
        </h3>
        <p className="text-gray-600 text-sm">
          Monitor progress and receive updates from your village officer.
        </p>
      </motion.div>

    </div>

  </div>
</section>


    </div>
  )
}

export default Home
