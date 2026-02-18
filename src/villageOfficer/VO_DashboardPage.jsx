import React from "react";
import { FiFileText, FiCheck } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

const recentRequests = [
  { id: "DR001", citizen: "Sunil Fernando",    type: "Birth Certificate",     date: "2024-01-15", status: "PENDING"     },
  { id: "DR002", citizen: "Malini Jayawardena", type: "Character Certificate", date: "2024-01-14", status: "IN_PROGRESS" },
  { id: "DR003", citizen: "Ajith perera",       type: "Income Certificate",    date: "2024-01-10", status: "COMPLETED"   },
];

const statusBadge = (status) => {
  const map = {
    PENDING:     "bg-yellow-100 text-yellow-700 border border-yellow-300",
    IN_PROGRESS: "bg-purple-100 text-purple-700 border border-purple-300",
    COMPLETED:   "bg-green-100  text-green-700  border border-green-300",
  };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
};

const stats = [
  {
    label: "Total Requests",
    value: 3,
    bg: "#42a5f5",
    icon: <FiFileText className="text-white text-xl" />,
  },
  {
    label: "Pending",
    value: 1,
    bg: "#f5a623",
    icon: <HiOutlineClipboardList className="text-white text-xl" />,
  },
  {
    label: "In Progress",
    value: 1,
    bg: "#ab47bc",
    icon: <MdOutlinePendingActions className="text-white text-xl" />,
  },
  {
    label: "Completed",
    value: 1,
    bg: "#4caf50",
    icon: <FiCheck className="text-white text-xl" />,
  },
];

const VO_DashboardPage = () => {
  return (
    <div>
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100"
          >
            <div>
              <p className="text-gray-400 text-sm font-medium mb-2">{s.label}</p>
              <p className="text-gray-900 font-extrabold text-4xl leading-none">{s.value}</p>
            </div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.bg }}
            >
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Division Requests ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 font-bold text-lg mb-5">Recent Division Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {["ID", "Citizen", "Type", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-6 text-gray-400 font-semibold text-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r, i) => (
                <tr key={r.id} className={i < recentRequests.length - 1 ? "border-b border-gray-100" : ""}>
                  <td className="py-4 pr-6 text-gray-500 text-sm font-semibold">{r.id}</td>
                  <td className="py-4 pr-6 text-gray-900 text-sm font-bold">{r.citizen}</td>
                  <td className="py-4 pr-6 text-gray-500 text-sm">{r.type}</td>
                  <td className="py-4 pr-6 text-gray-500 text-sm">{r.date}</td>
                  <td className="py-4">{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VO_DashboardPage;