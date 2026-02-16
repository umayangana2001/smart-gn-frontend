import React from "react";

const officers = [
  { id: "VO001", name: "Kamal Perera",      division: "Colombo North", email: "kamal@gn.gov.lk",  active: true },
  { id: "VO002", name: "Nimal Silva",       division: "Colombo South", email: "nimal@gn.gov.lk",  active: true },
];

// ── Stat card icons ─────────────────────────────────────────────
const ComplaintIco = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const PendingIco = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);
const CheckIco = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const OfficersIco = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const stats = [
  { label: "Total Complaints", value: 156, icon: <ComplaintIco />, bg: "#ff6b35" },
  { label: "Pending Requests", value: 42,  icon: <PendingIco />,   bg: "#f5a623" },
  { label: "Completed",        value: 234, icon: <CheckIco />,     bg: "#4caf50" },
  { label: "Active Officers",  value: 12,  icon: <OfficersIco />,  bg: "#42a5f5" },
];

const AdminDashboardContent = () => {
  return (
    <div>
      {/* ── 4-Column Stat Cards ── */}
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

      {/* ── Village Officers Table ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 font-bold text-lg mb-5">Village Officers</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {["ID", "Name", "Division", "Email", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4 text-gray-400 font-semibold text-sm"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {officers.map((o, i) => (
                <tr
                  key={o.id}
                  className={i < officers.length - 1 ? "border-b border-gray-100" : ""}
                >
                  <td className="py-4 pr-4 text-gray-500 text-sm font-semibold">{o.id}</td>
                  <td className="py-4 pr-4 text-gray-900 text-sm font-bold">{o.name}</td>
                  <td className="py-4 pr-4 text-gray-500 text-sm">{o.division}</td>
                  <td className="py-4 pr-4 text-gray-500 text-sm">{o.email}</td>
                  <td className="py-4">
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;