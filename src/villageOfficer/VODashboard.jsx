import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";

import {
  FiHome, FiUser, FiLock,
} from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineBarChart }      from "react-icons/md";

import VO_TopBar from "./VO_TopBar";
import VO_DashboardPage from "./VO_DashboardPage";
import DivisionRequests from "./DivisionRequests";
import Reports from "./Reports";
import Profile from "./Profile";
import ChangePassword from "../admin/ChangePassword";

const sidebarItems = [
  { key: "Dashboard",         label: "Dashboard",         Icon: FiHome               },
  { key: "Division Requests", label: "Division Requests", Icon: HiOutlineClipboardList },
  { key: "Reports",           label: "Reports",           Icon: MdOutlineBarChart    },
  { key: "Profile",           label: "Profile",           Icon: FiUser               },
  { key: "Change Password",   label: "Change Password",   Icon: FiLock               },
];

const VODashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Load logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    else navigate("/login"); // redirect if no user
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const renderPage = () => {
    if (!currentUser) return <p className="text-center mt-10">Loading user...</p>;

    switch (activeSection) {
      case "Dashboard":         return <VO_DashboardPage />;
      case "Division Requests": return <DivisionRequests userId={currentUser.id} />;
      case "Reports":           return <Reports />;
      case "Profile":           return <Profile userId={currentUser.id} />;
      case "Change Password":   return <ChangePassword userId={currentUser.id} />;
      default:                  return <VO_DashboardPage />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed left-0 right-0 z-40 bg-white shadow flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
        <h2 className="font-semibold">Village Officer Panel</h2>
      </div>

      {/* Mobile Overlay */}
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

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed md:relative z-50 w-72 min-h-full bg-[#1a1f36] text-white shadow-xl p-6"
          >
            {/* Mobile close */}
            <div className="flex justify-between items-center px-6 pt-6 mb-2 md:hidden">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <button onClick={() => setSidebarOpen(false)}><X /></button>
            </div>

            {/* Logo / Brand */}
            <div className="px-5 py-6 border-b border-white/10 flex items-center gap-3">
              <img src="/smart-gn-logo.png" alt="Smart GN" className="w-11 h-11 rounded-xl object-cover" />
              <div>
                <p className="text-white font-bold text-lg leading-tight">Smart GN</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <User />
                  <span className="text-gray-400 text-xs">Village Officer</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-700 " />

            {/* Menu */}
            <ul className="space-y-2 mt-4">
              {sidebarItems.map((item) => {
                const Icon = item.Icon;
                const isActive = activeSection === item.key;

                return (
                  <motion.li
                    key={item.key}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => { setActiveSection(item.key); setSidebarOpen(false); }}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
                      ${isActive ? "bg-[#2d3452] text-green-400 font-semibold" : "text-white hover:bg-white/10"}`}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <VO_TopBar activeSection={activeSection} />
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

export default VODashboard;
