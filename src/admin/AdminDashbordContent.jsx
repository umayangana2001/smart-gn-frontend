import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDashboardStats ,
  getAllGNs,
  deactivateGN,} from "../services/adminService";

const AdminDashboardContent = () => {
  const [stats, setStats] = useState(null);
  const [gns, setGns] = useState([]);

  // 📊 Load dashboard stats
  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats([
        {
          label: "Total Complaints",
          value: data.complaints.totalComplaints,
          bg: "#ff6b35",
        },
        {
          label: "Pending Requests",
          value: data.serviceRequests.pendingRequests,
          bg: "#f5a623",
        },
        {
          label: "Completed Requests",
          value: data.serviceRequests.completedRequests,
          bg: "#4caf50",
        },
        {
          label: "Active Officers",
          value: data.users.activeGNs,
          bg: "#42a5f5",
        },
      ]);
    } catch (err) {
      toast.error("Failed to load dashboard stats");
    }
  };

  // 👨‍💼 Load GNs
  const loadGNs = async () => {
    try {
      const res = await getAllGNs();
      setGns(res.gns);
    } catch (err) {
      toast.error("Failed to load officers");
    }
  };

  // ❌ Deactivate
  const handleDeactivate = async (id) => {
    try {
      await deactivateGN(id);
      toast.success("Officer deactivated");
      loadGNs();
      loadDashboard();
    } catch (err) {
      toast.error("Failed to deactivate officer");
    }
  };

  useEffect(() => {
    loadDashboard();
    loadGNs();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border"
          >
            <div>
              <p className="text-gray-400 text-sm">{s.label}</p>
              <p className="text-4xl font-bold">{s.value}</p>
            </div>
            <div
              className="w-12 h-12 rounded-xl"
              style={{ background: s.bg }}
            ></div>
          </div>
        ))}
      </div>

      {/* GN Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-bold mb-4">Village Officers</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Division</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {gns.map((g) => (
              <tr key={g.id} className="border-t">
                <td>{g.id}</td>
                <td>{g.fullName}</td>
                <td>{g.email}</td>
                <td>{g.division}</td>
                <td>
                  {g.isActive ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="bg-gray-400 text-white px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                </td>

                <td>
                  {g.isActive && (
                    <button
                      onClick={() => handleDeactivate(g.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
