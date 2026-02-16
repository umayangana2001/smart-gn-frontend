import React from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { HiOutlineViewGrid }  from "react-icons/hi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineBarChart }   from "react-icons/md";
import { FiUser, FiLock }     from "react-icons/fi";

// ── Page header icon per section ────────────────────────────────
const pageIcons = {
  "Dashboard":          <HiOutlineViewGrid        className="text-2xl text-indigo-500" />,
  "Division Requests":  <HiOutlineClipboardList   className="text-2xl text-indigo-500" />,
  "Reports":            <MdOutlineBarChart         className="text-2xl text-indigo-500" />,
  "Profile":            <FiUser                   className="text-2xl text-indigo-500" />,
  "Change Password":    <FiLock                   className="text-2xl text-indigo-500" />,
};

const VO_TopBar = ({ activeSection }) => {
  return (
    <div className="bg-white h-16 flex items-center justify-between px-7 border-b border-gray-100 flex-shrink-0 w-full">

      {/* Left — icon + title */}
      <div className="flex items-center gap-2.5">
        {pageIcons[activeSection]}
        <span className="text-xl font-bold text-gray-900">{activeSection}</span>
      </div>

      {/* Right — bell + user */}
      <div className="flex items-center gap-5">

        {/* Bell */}
        <div className="relative cursor-pointer group">
          <FiBell className="text-2xl text-gray-400 group-hover:text-gray-600 transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </div>

        {/* User */}
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
              <span className="text-xs">🗂️</span>
              <span className="text-xs text-gray-400">Village Officer</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VO_TopBar;