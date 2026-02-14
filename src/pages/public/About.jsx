import { useState, useEffect } from "react";
import { ShieldCheck, Zap, Users, Eye } from "lucide-react";

const slides = [
  {
    image:
      "https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_1280.jpg",
    text: "Digitally Empowering Village Administration",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/08/01/00/38/man-2562325_1280.jpg",
    text: "Transparent & Efficient Public Services",
  },
  {
    image:
      "https://images.unsplash.com/photo-1739519261478-e626c0ebd8c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Connecting Citizens with Government",
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* 🌿 SLIDESHOW */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={slides[current].image}
          alt="slide"
          className="w-full h-full object-cover transition duration-700"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            {slides[current].text}
          </h1>
        </div>
      </div>

      {/* 🌿 WHO WE ARE */}
      <div className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/10/01/12/04/hands-2805247_1280.jpg"
          alt="about"
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Smart GN System is a digital governance platform designed to
            modernize Grama Niladhari services across Sri Lanka. Our system
            bridges the gap between citizens and local government offices
            through secure and transparent online services.
          </p>
          <p className="text-gray-700 mt-4">
            By reducing paperwork and enabling digital requests, we help
            villages move towards a smarter and more connected future.
          </p>
        </div>
      </div>

      {/* 🌿 MISSION & VISION */}
      <div
        className="relative py-20 px-6 md:px-20 text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1759825905992-0e0e98736820?q=80&w=1170&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-green-900/80"></div>

        <div className="relative grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p>
              To provide reliable, accessible, and citizen-friendly digital
              public services at the grassroots level.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p>
              To build a transparent, efficient, and digitally empowered
              village administration system for Sri Lanka.
            </p>
          </div>
        </div>
      </div>

      {/* 🌿 CORE VALUES */}
      <div className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <ValueCard
            icon={<ShieldCheck size={40} />}
            title="Security"
            desc="Protecting citizen data with modern security standards."
          />
          <ValueCard
            icon={<Eye size={40} />}
            title="Transparency"
            desc="Ensuring open and trackable service processes."
          />
          <ValueCard
            icon={<Zap size={40} />}
            title="Efficiency"
            desc="Reducing delays through digital workflows."
          />
          <ValueCard
            icon={<Users size={40} />}
            title="Community Focus"
            desc="Empowering villages through accessible technology."
          />
        </div>
      </div>

    </div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
      <div className="text-green-700 flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
