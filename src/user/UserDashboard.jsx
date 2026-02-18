import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";


import { FiHome, FiUser, FiLock, FiPlusCircle, FiCalendar } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

import UserDashboardPage from "./UserDashboardPage.jsx";
import UserProfile from './Profile.jsx';
import UserTopbar from "./UserTopbar.jsx";
import MyRequests from "./MyRequests.jsx";
import ChangePassword from "../admin/ChangePassword";
import Appointment from "./Appointment.jsx";
import AddComplaint from "./AddComplaint.jsx";


const sidebarItems = [
  { key: "Dashboard", label: "Dashboard", Icon: FiHome },
  { key: "Appointments", label: "Appointments", Icon: FiCalendar },
  { key: "My_Requests", label: "My Requests", Icon: HiOutlineClipboardList },
  { key: "Add_Complaint", label: "Add Complaint", Icon: FiPlusCircle },
  { key: "Profile", label: "Profile", Icon: FiUser },
  { key: "Change_Password", label: "Change Password", Icon: FiLock },
];

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  const renderPage = () => {
    switch (activeSection) {
      case "Appointments":
        return <Appointment />
      case "Add_Complaint":
        return <AddComplaint />
      case "Profile":
        return <UserProfile />;
      case "My_Requests":
        return <MyRequests />
      case "Change_Password":
        return <ChangePassword />
      default:
        return <UserDashboardPage />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <div className="md:hidden fixed left-0 right-0 z-40 bg-white shadow flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="font-semibold">User Panel</h2>
      </div>

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

      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed md:relative z-50 w-72 min-h-full bg-[#1a1f36] text-white shadow-xl p-6"
          >
            <div className="flex justify-between items-center px-6 pt-6 mb-2 md:hidden">
              <h1 className="text-xl font-bold text-white">User Panel</h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X />
              </button>
            </div>

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
                      Citizen
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-700 " />

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
                      ${isActive
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <UserTopbar activeSection={activeSection} />

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

export default UserDashboard;
