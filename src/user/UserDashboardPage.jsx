import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFileText, FiCheckCircle, FiClock, FiTrendingUp, FiArrowRight, FiUser, FiUpload } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

const UserDashboardPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Digital Transformation",
      desc: "Access government services from the comfort of your home - anytime, anywhere."
    },
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Smart Governance",
      desc: "Stay updated with your Gramaniladari services through our digital platform."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // ✅ Admin style stats structure
  const stats = [
    { label: "Total Requests", value: "12", icon: <FiFileText size={24} />, bg: "#42a5f5" },
    { label: "Approved", value: "8", icon: <FiCheckCircle size={24} />, bg: "#4caf50" },
    { label: "Pending", value: "3", icon: <FiClock size={24} />, bg: "#f5a623" },
    { label: "This Month", value: "5", icon: <FiTrendingUp size={24} />, bg: "#ff6b35" },
  ];

  return (
    <div className="space-y-8 pb-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back! 👋</h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your requests today.
        </p>
      </div>

      {/* ✅ Admin Style Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100"
          >
            <div>
              <p className="text-gray-400 text-sm font-medium mb-2">
                {s.label}
              </p>
              <p className="text-gray-900 font-extrabold text-4xl leading-none">
                {s.value}
              </p>
            </div>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.bg }}
            >
              <div className="text-white">
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

            <img
              src={slides[currentSlide].image}
              alt="Slide"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white space-y-4">
              <span className="text-sm font-medium tracking-wider text-green-400 uppercase">
                {slides[currentSlide].title}
              </span>
              <p className="max-w-lg text-lg text-gray-200 leading-relaxed">
                {slides[currentSlide].desc}
              </p>
              <button className="bg-[#78b144] hover:bg-[#689c3a] text-white px-6 py-3 rounded-lg w-fit flex items-center gap-2 font-bold transition-all shadow-lg mt-4">
                Get Started <FiArrowRight />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 left-12 z-30 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? "w-8 bg-[#78b144]"
                  : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            icon={<FiUser size={20} className="text-white" />}
            title="My Info"
            desc="Update your personal information"
            color="bg-blue-500"
          />
          <QuickActionCard
            icon={<HiOutlineClipboardList size={20} className="text-white" />}
            title="My Requests"
            desc="View and manage your requests"
            color="bg-green-500"
          />
          <QuickActionCard
            icon={<FiUpload size={20} className="text-white" />}
            title="Uploads"
            desc="Manage your documents"
            color="bg-purple-500"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[#171140] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-10 mt-6 relative overflow-hidden">
        <div className="flex-1 space-y-6 z-10">
          <div>
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
              About SmartGN
            </span>
            <h3 className="text-2xl font-bold mt-2">
              Streamlined Governance
            </h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">
            SmartGN is a revolutionary digital platform designed to streamline
            Gramaniladari services across Sri Lanka.
          </p>

          <div className="flex gap-8 pt-4 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Available
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Digital
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">Fast</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Response
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Office"
            className="rounded-xl shadow-2xl w-full h-64 object-cover border-4 border-white/10"
          />
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon, title, desc, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md transition-all">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-sm`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-400 mt-1">{desc}</p>
    </div>
    <div className="mt-2 text-[#78b144] text-xs font-bold flex items-center gap-1">
      Get Started <FiArrowRight size={14} />
    </div>
  </div>
);

export default UserDashboardPage;
