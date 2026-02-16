import React, { useState } from "react";

const complaintsData = [
  { id: "CMP001", title: "Road Repair Needed",   category: "Infrastructure", priority: "HIGH",   date: "2024-01-15", status: "PENDING"     },
  { id: "CMP002", title: "Street Light Issue",   category: "Utilities",      priority: "MEDIUM", date: "2024-01-14", status: "IN_PROGRESS"  },
  { id: "CMP003", title: "Water Supply Problem", category: "Utilities",      priority: "HIGH",   date: "2024-01-10", status: "COMPLETED"    },
  { id: "CMP004", title: "Garbage Collection",   category: "Sanitation",     priority: "LOW",    date: "2024-01-12", status: "ACCEPTED"     },
];

const categories = ["All Categories", "Infrastructure", "Utilities", "Sanitation"];
const statuses   = ["All Status", "PENDING", "IN_PROGRESS", "COMPLETED", "ACCEPTED"];

// ── Badge helpers ───────────────────────────────────────────────
const PriorityBadge = ({ priority }) => {
  const map = {
    HIGH:   "bg-red-500 text-white",
    MEDIUM: "bg-amber-400 text-white",
    LOW:    "bg-gray-200 text-gray-700",
  };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${map[priority] ?? "bg-gray-100"}`}>
      {priority}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    PENDING:     "bg-yellow-100 text-yellow-800 border border-yellow-300",
    IN_PROGRESS: "bg-purple-100 text-purple-800 border border-purple-300",
    COMPLETED:   "bg-green-100  text-green-800  border border-green-300",
    ACCEPTED:    "bg-blue-100   text-blue-800   border border-blue-300",
  };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${map[status] ?? "bg-gray-100"}`}>
      {status}
    </span>
  );
};

// ── Action icons ────────────────────────────────────────────────
const EyeIco = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const PencilIco = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const GearIco = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ManageComplaints= () => {
  const [catFilter,  setCatFilter]  = useState("All Categories");
  const [statFilter, setStatFilter] = useState("All Status");

  const filtered = complaintsData.filter(
    (c) =>
      (catFilter  === "All Categories" || c.category === catFilter) &&
      (statFilter === "All Status"     || c.status   === statFilter)
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-16">
      {/* Inner header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <GearIco />
          <h2 className="text-lg font-bold text-gray-900">Manage Complaints</h2>
        </div>
        <div className="flex gap-3">
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-indigo-400 cursor-pointer"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            value={statFilter}
            onChange={(e) => setStatFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-indigo-400 cursor-pointer"
          >
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {["ID", "Title", "Category", "Priority", "Date", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left pb-3 pr-3 text-gray-400 font-semibold text-sm whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                className={i < filtered.length - 1 ? "border-b border-gray-50" : ""}
              >
                <td className="py-4 pr-3 text-gray-500 text-sm font-semibold">{c.id}</td>
                <td className="py-4 pr-3 text-gray-900 text-sm font-bold whitespace-nowrap">{c.title}</td>
                <td className="py-4 pr-3 text-gray-500 text-sm">{c.category}</td>
                <td className="py-4 pr-3"><PriorityBadge priority={c.priority} /></td>
                <td className="py-4 pr-3 text-gray-500 text-sm whitespace-nowrap">{c.date}</td>
                <td className="py-4 pr-3"><StatusBadge status={c.status} /></td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><EyeIco /></button>
                    <button className="p-1 hover:bg-amber-50 rounded-lg transition-colors"><PencilIco /></button>
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

export default ManageComplaints;


