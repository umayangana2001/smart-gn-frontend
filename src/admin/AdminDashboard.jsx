import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";
import ServiceTypes from "./ServiceTypes.jsx";


import AdminDashboardContent from "./AdminDashbordContent.jsx";
import CreateVillageOfficer from "./CreateVillageOfficer.jsx";
import ManageComplaints from "./ManageComplaints.jsx";
import ChangePassword from "./ChangePassword.jsx";
import TopBar from "./TopBar.jsx";

import { FiHome, FiUser, FiClipboard, FiLock } from "react-icons/fi";

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", Icon: FiHome },
  { key: "Create_Officer", label: "Create Officer", Icon: FiUser },
  { key: "Manage_Complaints", label: "Manage Complaints", Icon: FiClipboard },
  { key: "Change_Password", label: "Change Password", Icon: FiLock },
  { key: "All_Users", label: "All Users", Icon: FiUser },
   { key: "Service_Types", label: "Service Types", Icon: FiClipboard },
];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 logout
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  // ✅ FIX: page renderer
  const renderPage = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboardContent />;
      case "Create_Officer":
        return <CreateVillageOfficer />;
      case "Manage_Complaints":
        return <ManageComplaints />;
      case "Change_Password":
        return <ChangePassword />;
        case "Service_Types":
      return <ServiceTypes />;
      default:
        return <AdminDashboardContent />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* 🔥 Mobile Header */}
      <div className="md:hidden fixed left-0 right-0 z-40 bg-white shadow flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="font-semibold">Admin Panel</h2>
      </div>

      {/* 🔥 Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 🔥 Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed md:relative z-50 w-72 min-h-full bg-[#1a1f36] text-white shadow-xl p-6"
          >
            {/* Mobile close row */}
            <div className="flex justify-between items-center px-6 pt-6 mb-2 md:hidden">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X />
              </button>
            </div>

            {/* Logo / brand */}
            <div className="px-5 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src="/smart-gn-logo.png"
                  alt="Smart GN"
                  className="w-11 h-11 rounded-xl object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />

                <div
                  className="w-11 h-11 rounded-xl items-center justify-center text-xl flex-shrink-0"
                  style={{
                    display: "none",
                    background:
                      "linear-gradient(135deg,#a78bfa,#6c63ff 60%,#f59e42)",
                  }}
                >
                  ⚡
                </div>

                <div>
                  <p className="text-white font-bold text-lg leading-tight">
                    Smart GN
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <User />
                    <span className="text-gray-400 text-xs">
                      Administrator
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-700 " />

            {/* Menu */}
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.Icon;
                const isActive = activeSection === item.key;

                return (
                  <motion.li
                    key={item.key}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      setActiveSection(item.key);
                      setSidebarOpen(false);
                    }}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
                      ${
                        isActive
                          ? "bg-[#2d3452] text-green-400 font-semibold"
                          : "text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"
                      />
                    )}

                    <Icon size={20} />
                    {item.label}
                  </motion.li>
                );
              })}

              {/* Logout */}
              <motion.li
                whileHover={{ scale: 1.03 }}
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-red-500 hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </motion.li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 🔥 Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar */}
        <TopBar activeSection={activeSection} />

        {/* Animated Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:pt-6 pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
