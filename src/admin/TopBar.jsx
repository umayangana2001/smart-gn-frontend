import React from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { FiUser, FiLock } from "react-icons/fi";
import NotificationBell from "../components/NotificationBell";

// Map page names to icons
const pageIcons = {
  dashboard: <HiOutlineChartBar className="text-2xl text-indigo-500" />,
  Create_Officer: <FiUser className="text-2xl text-indigo-500" />,
  Manage_Complaints: <FiSettings className="text-2xl text-gray-400" />,
  Change_Password: <FiLock className="text-2xl text-indigo-500" />,
};

const TopBar = ({ activeSection }) => {
  // 🔹 Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const fullName = user.fullName || "Demo User";
  const role = user.role || "User";
  const avatarUrl = user.profile?.avatar || ""; // optional field for avatar image

  return (
    <div className="bg-white h-16 flex items-center justify-between px-7 border-b border-gray-100 flex-shrink-0 w-full">

      {/* Left — page title with icon */}
      <div className="flex items-center gap-2.5">
        {pageIcons[activeSection]}
        <span className="text-xl font-bold text-gray-900">{activeSection}</span>
      </div>

      {/* Right — bell + user */}
      <div className="flex items-center gap-5">

        {/* Bell notification */}
        <NotificationBell />


        {/* User avatar + info */}
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6c63ff,#a78bfa)" }}
            >
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-900">{fullName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <FiSettings className="text-gray-400 text-xs" />
              <span className="text-xs text-gray-400">{role}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
