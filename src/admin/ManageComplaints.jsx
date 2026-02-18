import React, { useEffect, useState } from "react";
import {
  getAllComplaints,
  updateComplaintStatus,
} from "../services/adminService";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// filters
const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "ACCEPTED"];

// status badge
const StatusBadge = ({ status }) => {
  const map = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    ACCEPTED: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${map[status]}`}>
      {status}
    </span>
  );
};

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null); // modal data
  const [newStatus, setNewStatus] = useState("");

  // load data
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllComplaints();
        setComplaints(res.complaints);
      } catch (err) {
        toast.error("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // update status
  const handleUpdate = async () => {
    try {
      await updateComplaintStatus(selected.id, newStatus);

      setComplaints((prev) =>
        prev.map((c) =>
          c.id === selected.id ? { ...c, status: newStatus } : c
        )
      );

      toast.success("Status updated");
      setSelected(null);
    } catch {
      toast.error("Update failed");
    }
  };

  // PDF export
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Complaint Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [["ID", "Title", "User", "Status", "Date"]],
      body: complaints.map((c) => [
        c.id,
        c.title,
        c.user?.fullName,
        c.status,
        new Date(c.createdAt).toLocaleDateString(),
      ]),
    });

    doc.save("complaints.pdf");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border mt-16">
      {/* header */}
      <div className="flex justify-between mb-6">
        <h2 className="font-bold text-lg">Manage Complaints</h2>

        <button
          onClick={exportPDF}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Export PDF
        </button>
      </div>

      {/* table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-left text-gray-400 border-b">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="py-3">{c.id}</td>
                <td className="py-3 font-semibold">{c.title}</td>
                <td>{c.user?.fullName}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <StatusBadge status={c.status} />
                </td>

                <td className="flex gap-2 py-3">
                  {/* VIEW */}
                  <button
                    onClick={() => {
                      setSelected(c);
                      setNewStatus(c.status);
                    }}
                    className="px-2 py-1 bg-gray-100 rounded text-xs"
                  >
                    👁 View
                  </button>

                  {/* QUICK STATUS */}
                  <button
                    onClick={() =>
                      updateComplaintStatus(c.id, "COMPLETED")
                    }
                    className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ───────── MODAL ───────── */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="font-bold text-lg mb-4">
              Complaint Details
            </h3>

            <p><b>Title:</b> {selected.title}</p>
            <p><b>Description:</b> {selected.description}</p>
            <p><b>User:</b> {selected.user?.fullName}</p>
            <p><b>Email:</b> {selected.user?.email}</p>

            {/* status edit */}
            <div className="mt-4">
              <label className="text-sm font-semibold">Change Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;
