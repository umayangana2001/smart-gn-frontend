import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import slide4 from "../../assets/images/slide4.jpg";

function Home() {
  const slides = [
    {
      title: "Digital Grama Niladhari Services",
      description:
        "Access essential government services online with trust and efficiency.",
      image: slide1,
    },
    {
      title: "Submit Complaints Online",
      description:
        "Easily submit and track complaints directly to your village officer.",
      image: slide2,
    },
    {
      title: "Book Appointments Easily",
      description:
        "Schedule meetings with your GN officer conveniently.",
      image: slide3,
    },
    {
      title: "Track Your Service Requests",
      description:
        "Monitor the progress of your requests in real time.",
      image: slide4,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative h-150 flex items-center text-white overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/40 to-primary/30"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {slides[currentSlide].title}
              </h1>

              <p className="text-lg text-gray-200 mb-8 max-w-xl">
                {slides[currentSlide].description}
              </p>

              {/* Get Started Button */}
              <div className="flex">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-4 px-10 py-4 rounded-full 
                             bg-accent text-green-900 text-lg font-semibold 
                             shadow-md transition duration-300 hover:scale-105"
                >
                  <span>Get Started</span>

                  <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Right Side Card */}
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">
                Serving Your Village Digitally
              </h2>
              <p className="text-gray-200">
                Submit complaints, book appointments, track requests,
                and access government services online with ease.
              </p>
            </div>
          </div>

        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white scale-110"
                  : "bg-white/50"
              }`}
            ></div>
          ))}
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
            {[
              "Complaint Submission",
              "Appointment Booking",
              "Request Tracking",
              "Secure Document Upload"
            ].map((title, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-primary"
              >
                <h3 className="font-semibold text-lg mb-3 text-primary">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm">
                  Access this service easily through the Smart GN platform.
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* HOW IT WORKS */}
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
            {["Register", "Submit Request", "Track & Receive Service"].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-3 text-primary">
                  {step}
                </h3>
                <p className="text-gray-600 text-sm">
                  Follow this step to efficiently use Smart GN services.
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
