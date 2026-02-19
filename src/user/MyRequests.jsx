import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEye, FiDownload, FiTrash2, FiX, FiSend, FiInfo } from "react-icons/fi";
import { createServiceRequest, deleteServiceRequest, getMyServiceRequests, getServiceTypes } from "../services/RequestService";

const MyRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [formData, setFormData] = useState({ title: "", type: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      const userObj = JSON.parse(localStorage.getItem("user"));
      if (!userObj) return;

      const [userRequests, types] = await Promise.all([
        getMyServiceRequests(userObj.id),
        getServiceTypes()
      ]);
      setRequests(userRequests);
      setServiceTypes(types);
    } catch (err) {
      console.error("Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Request title is required";
    if (!formData.type) newErrors.type = "Please select a service type";
    if (!formData.description) newErrors.description = "Description cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRequest = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userObj = JSON.parse(localStorage.getItem("user"));
        const payload = {
          serviceTypeId: formData.type,
          remarks: formData.description,
          documentPath: "/uploads/documents/document.pdf"
        };
        await createServiceRequest(userObj.id, payload);
        setIsModalOpen(false);
        setFormData({ title: "", type: "", description: "" });
        fetchAllData();
      } catch (err) {
        alert("Create Failed: " + err.response?.data?.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        const userObj = JSON.parse(localStorage.getItem("user"));
        await deleteServiceRequest(id, userObj.id);
        setRequests(requests.filter((req) => req.id !== id));
        alert("Deleted successfully!");
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Delete Failed!");
      }
    }
  };

  const handleView = (req) => {
    setViewingRequest(req);
  };

  const buttonStyle = { background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" };

  if (loading) return <div className="text-center p-10 font-bold">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-gray-900 font-bold text-2xl">My Requests</h2>
          <p className="text-gray-500 text-sm">Track and manage all your service requests</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          style={buttonStyle}
          className="text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg"
        >
          <FiPlus /> Add Request
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-sm font-bold text-gray-700">Request ID</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-700">Service Type</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-700">Date</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{req.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{req.serviceType?.name || "Service"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === "APPROVED" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => handleView(req)} className="text-green-600 hover:scale-110 transition-transform p-1">
                        <FiEye size={18} />
                      </button>
                      <button onClick={() => handleDelete(req.id)} className="text-red-400 hover:scale-110 transition-transform p-1">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {viewingRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingRequest(null)} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl z-10 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                  <FiInfo className="text-blue-500" />
                  <h3 className="text-lg font-bold text-gray-800">Request Details</h3>
                </div>
                <button onClick={() => setViewingRequest(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><FiX size={20} /></button>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Request ID</span>
                  <span className="font-bold text-blue-600">{viewingRequest.id}</span>
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-bold uppercase">Type</label>
                  <p className="text-gray-800 font-bold">{viewingRequest.serviceType?.name}</p>
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-bold uppercase">Description / Remarks</label>
                  <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl mt-1 border border-gray-100 italic">"{viewingRequest.remarks}"</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl z-10 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800">New Service Request</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><FiX size={20} /></button>
              </div>
              <form onSubmit={handleAddRequest} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Request Title</label>
                  <input type="text" className={`w-full px-4 py-3 rounded-xl border outline-none ${errors.title ? 'border-red-500' : 'border-gray-200'}`} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Service Type</label>
                  <select className={`w-full px-4 py-3 rounded-xl border bg-white outline-none ${errors.type ? 'border-red-500' : 'border-gray-200'}`} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="">Select a service</option>
                    {serviceTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                  <textarea rows="4" className={`w-full px-4 py-3 rounded-xl border outline-none ${errors.description ? 'border-red-500' : 'border-gray-200'}`} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" style={buttonStyle} className="w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"><FiSend /> Send Request</motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyRequests;