import React, { useEffect, useState } from "react";
import {
  FiFileText,
  FiCheck,
} from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import {
  getDivisionRequests,
  gnApproveRejectRequest,
  downloadRequestDocument,
} from "../services/VillageOfficerService";

const statusBadge = (status) => {
  const map = {
    PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    IN_PROGRESS: "bg-purple-100 text-purple-700 border border-purple-300",
    COMPLETED: "bg-green-100 text-green-700 border border-green-300",
  };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
};

const VO_DashboardPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await getDivisionRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch division requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Stats calculation
  const stats = [
    {
      label: "Total Requests",
      value: requests.length,
      bg: "#42a5f5",
      icon: <FiFileText className="text-white text-xl" />,
    },
    {
      label: "Pending",
      value: requests.filter((r) => r.status === "PENDING").length,
      bg: "#f5a623",
      icon: <HiOutlineClipboardList className="text-white text-xl" />,
    },
    {
      label: "In Progress",
      value: requests.filter((r) => r.status === "IN_PROGRESS").length,
      bg: "#ab47bc",
      icon: <MdOutlinePendingActions className="text-white text-xl" />,
    },
    {
      label: "Completed",
      value: requests.filter((r) => r.status === "COMPLETED").length,
      bg: "#4caf50",
      icon: <FiCheck className="text-white text-xl" />,
    },
  ];

  const handleApproveReject = async (requestId, action) => {
    const remarks = prompt("Enter remarks (optional):", "");
    try {
      await gnApproveRejectRequest(requestId, action, remarks);
      toast.success(`Request ${action.toLowerCase()}ed successfully`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  const handleDownload = async (requestId) => {
    try {
      await downloadRequestDocument(requestId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download document");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-5">
      <Toaster position="top-right" />

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
                {["ID", "Citizen", "Type", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-6 text-gray-400 font-semibold text-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={r.id} className={i < requests.length - 1 ? "border-b border-gray-100" : ""}>
                  <td className="py-4 pr-6 text-gray-500 text-sm font-semibold">{r.id}</td>
                  <td className="py-4 pr-6 text-gray-900 text-sm font-bold">{r.user?.profile?.fullName || r.user?.email}</td>
                  <td className="py-4 pr-6 text-gray-500 text-sm">{r.serviceType?.name}</td>
                  <td className="py-4 pr-6 text-gray-500 text-sm">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="py-4">{statusBadge(r.status)}</td>
                  <td className="py-4 flex gap-2">
                    {r.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleApproveReject(r.id, "ACCEPTED")}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproveReject(r.id, "REJECTED")}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {r.documentPath && (
                      <button
                        onClick={() => handleDownload(r.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Download
                      </button>
                    )}
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

export default VO_DashboardPage;
