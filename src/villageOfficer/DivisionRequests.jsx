import React, { useState } from "react";
import { FiEye, FiMessageSquare } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaFileDownload } from "react-icons/fa";

const initialRequests = [
  { id: "DR001", citizen: "Sunil Fernando",    type: "Birth Certificate",     date: "2024-01-15", docs: 2, status: "Pending"     },
  { id: "DR002", citizen: "Malini Jayawardena", type: "Character Certificate", date: "2024-01-14", docs: 3, status: "In Progress" },
  { id: "DR003", citizen: "Ajith Kumara",       type: "Income Certificate",    date: "2024-01-10", docs: 1, status: "Completed"   },
];

const statusOptions = ["Pending", "In Progress", "Completed", "Rejected"];
const filterOptions = ["All Status", ...statusOptions];

const DivisionRequests = () => {
  const [requests,   setRequests]   = useState(initialRequests);
  const [filter,     setFilter]     = useState("All Status");

  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filtered = filter === "All Status"
    ? requests
    : requests.filter((r) => r.status === filter);

  const statusSelectStyle = (status) => {
    const map = {
      Pending:     "bg-yellow-50  border-yellow-300 text-yellow-700",
      "In Progress": "bg-purple-50 border-purple-300 text-purple-700",
      Completed:   "bg-green-50   border-green-300  text-green-700",
      Rejected:    "bg-red-50     border-red-300    text-red-700",
    };
    return map[status] ?? "bg-gray-50 border-gray-200 text-gray-700";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Inner header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HiOutlineClipboardList className="text-gray-400 text-xl" />
          <h2 className="text-lg font-bold text-gray-900">Division Requests</h2>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-indigo-400 cursor-pointer"
        >
          {filterOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {["ID", "Citizen", "Type", "Date", "Docs", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left pb-3 pr-4 text-gray-400 font-semibold text-sm whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} className={i < filtered.length - 1 ? "border-b border-gray-50" : ""}>
                {/* ID */}
                <td className="py-4 pr-4 text-gray-500 text-sm font-bold">{r.id}</td>

                {/* Citizen */}
                <td className="py-4 pr-4 text-gray-900 text-sm font-bold whitespace-nowrap">{r.citizen}</td>

                {/* Type */}
                <td className="py-4 pr-4 text-gray-500 text-sm whitespace-nowrap">{r.type}</td>

                {/* Date */}
                <td className="py-4 pr-4 text-gray-500 text-sm">{r.date}</td>

                {/* Docs */}
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-1 text-blue-500 font-semibold text-sm">
                    <FaFileDownload className="text-base" />
                    <span>{r.docs}</span>
                  </div>
                </td>

                {/* Status dropdown */}
                <td className="py-4 pr-4">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold outline-none cursor-pointer transition-colors ${statusSelectStyle(r.status)}`}
                  >
                    {statusOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </td>

                {/* Actions */}
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                      <FiEye className="text-gray-500 text-base" />
                    </button>
                    <button className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors" title="Message">
                      <FiMessageSquare className="text-gray-400 text-base" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DivisionRequests;


