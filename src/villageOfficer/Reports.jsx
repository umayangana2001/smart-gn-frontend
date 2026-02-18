import React, { useEffect, useState } from "react";
import { FiFileText, FiCalendar, FiClock } from "react-icons/fi";
import { MdOutlineBarChart } from "react-icons/md";
import { getAllRequests } from "../services/VillageOfficerService";

const DonutChart = ({ data, total }) => {
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const slices = data.map((d) => {
    const len = (d.pct / 100) * circumference;
    const slice = { ...d, dashArray: `${len} ${circumference - len}`, dashOffset: -offset };
    offset += len;
    return slice;
  });

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="28"
          strokeDasharray={s.dashArray}
          strokeDashoffset={s.dashOffset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="26" fontWeight="800" fill="#7c3aed">{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#9ca3af">Total Requests</text>
    </svg>
  );
};

const Reports = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getAllRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // ─── Compute stats ───
  const totalRequests = requests.length;
  const thisMonthRequests = requests.filter(r => {
    const created = new Date(r.createdAt);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;
  const completedCount = requests.filter(r => r.status === "COMPLETED").length;
  const avgTime = requests.length
    ? Math.round(
        requests.reduce((sum, r) => {
          const created = new Date(r.createdAt);
          const updated = new Date(r.updatedAt || r.createdAt);
          return sum + (updated - created) / (1000 * 60 * 60 * 24);
        }, 0) / requests.length
      ) + " days"
    : "0 days";

  const reportStats = [
    { label: "Total Requests", value: totalRequests, bg: "#42a5f5", icon: <FiFileText className="text-white text-xl" /> },
    { label: "This Month", value: thisMonthRequests, bg: "#4caf50", icon: <FiCalendar className="text-white text-xl" /> },
    { label: "Completion Rate", value: totalRequests ? `${Math.round((completedCount / totalRequests) * 100)}%` : "0%", bg: "#ab47bc", icon: <MdOutlineBarChart className="text-white text-xl" /> },
    { label: "Avg. Time", value: avgTime, bg: "#f5a623", icon: <FiClock className="text-white text-xl" /> },
  ];

  // Requests by type
  const typeMap = {};
  requests.forEach(r => {
    const type = r.serviceType?.name || "Other";
    typeMap[type] = (typeMap[type] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(typeMap), 1);
  const requestsByType = Object.keys(typeMap).map((k) => ({
    label: k,
    count: typeMap[k],
    color: "#7c3aed",
    pct: Math.round((typeMap[k] / maxCount) * 100),
  }));

  // Status distribution
  const statusCounts = { COMPLETED: 0, IN_PROGRESS: 0, PENDING: 0 };
  requests.forEach(r => { statusCounts[r.status] = (statusCounts[r.status] || 0) + 1 });
  const statusDist = Object.keys(statusCounts).map(s => ({
    label: s.charAt(0) + s.slice(1).toLowerCase(),
    pct: totalRequests ? Math.round((statusCounts[s] / totalRequests) * 100) : 0,
    color: s === "COMPLETED" ? "#7c3aed" : s === "IN_PROGRESS" ? "#ec4899" : "#f59e0b"
  }));

  return (
    <div>
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {reportStats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-2">{s.label}</p>
              <p className="text-gray-900 font-extrabold text-4xl leading-none">{s.value}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Requests by Type */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">📊</span>
            <h2 className="text-base font-bold text-gray-900">Requests by Type</h2>
          </div>
          <div className="space-y-4">
            {requestsByType.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-700">{item.count}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">📝</span>
            <h2 className="text-base font-bold text-gray-900">Status Distribution</h2>
          </div>
          <div className="flex flex-col items-center gap-6">
            <DonutChart data={statusDist} total={totalRequests} />
            <div className="space-y-2 w-full max-w-xs">
              {statusDist.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-sm text-gray-600">
                    {s.label} ({s.pct}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
