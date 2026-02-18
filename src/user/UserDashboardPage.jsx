import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiArrowRight,
  FiUser,
  FiUpload,
} from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";



const UserDashboardPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState([
    { label: "Total Requests", value: 0, icon: <FiFileText size={24} />, bg: "#42a5f5" },
    { label: "Approved", value: 0, icon: <FiCheckCircle size={24} />, bg: "#4caf50" },
    { label: "Pending", value: 0, icon: <FiClock size={24} />, bg: "#f5a623" },
    { label: "This Month", value: 0, icon: <FiTrendingUp size={24} />, bg: "#ff6b35" },
  ]);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      title: "Digital Transformation",
      desc: "Access government services from the comfort of your home - anytime, anywhere.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      title: "Smart Governance",
      desc: "Stay updated with your Gramaniladari services through our digital platform.",
    },
  ];

  // 🎯 Fetch user requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const response = await API.get(
          `/service-request/requests/${user.id}`
        );

        const data = response.data;
        setRequests(data);

        // 🔥 Calculate stats dynamically
        const total = data.length;
        const approved = data.filter(r => r.status === "COMPLETED").length;
        const pending = data.filter(r => r.status === "PENDING").length;

        const thisMonth = data.filter(r => {
          const created = new Date(r.createdAt);
          const now = new Date();
          return (
            created.getMonth() === now.getMonth() &&
            created.getFullYear() === now.getFullYear()
          );
        }).length;

        setStats([
          { label: "Total Requests", value: total, icon: <FiFileText size={24} />, bg: "#42a5f5" },
          { label: "Approved", value: approved, icon: <FiCheckCircle size={24} />, bg: "#4caf50" },
          { label: "Pending", value: pending, icon: <FiClock size={24} />, bg: "#f5a623" },
          { label: "This Month", value: thisMonth, icon: <FiTrendingUp size={24} />, bg: "#ff6b35" },
        ]);

      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Carousel Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 pb-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your requests today.
        </p>
      </div>

      {/* 🔥 Dynamic Stats */}
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
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: s.bg }}
            >
              <div className="text-white">{s.icon}</div>
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
            <img
              src={slides[currentSlide].image}
              alt="Slide"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserDashboardPage;
