import React from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { FiGrid, FiUser, FiClipboard, FiLock } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";


const pageIcons = {
  "dashboard": <HiOutlineChartBar className="text-2xl text-indigo-500" />,
  "Create_Officer": <FiUser className="text-2xl text-indigo-500" />,
  "Appointments": <FiCalendar className="text-2xl text-gray-400" />,
  "My_Requests": <HiOutlineClipboardList className="text-2xl text-gray-400" />,
  "Profile": <FiUser className="text-2xl text-gray-400" />,
  "Change_Password": <FiLock className="text-2xl text-indigo-500" />,
};

const TopBar = ({ activeSection }) => {
  return (
    <div className="bg-white h-16 flex items-center justify-between px-7 border-b border-gray-100 flex-shrink-0 w-full">

      <div className="flex items-center gap-2.5">
        {pageIcons[activeSection]}
        <span className="text-xl font-bold text-gray-900">{activeSection}</span>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative cursor-pointer group">
          <FiBell className="text-2xl text-gray-400 group-hover:text-gray-600 transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6c63ff,#a78bfa)" }}
          >
            D
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-900">Demo User</p>
            <div className="flex items-center gap-1 mt-0.5">
              <FiSettings className="text-gray-400 text-xs" />
              <span className="text-xs text-gray-400">Administrator</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;