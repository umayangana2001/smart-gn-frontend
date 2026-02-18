import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiPlus, FiEye, FiDownload, FiTrash2, FiX, FiSend, FiFileText, FiInfo } from "react-icons/fi";

const MyRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingRequest, setViewingRequest] = useState(null);
  
  const [requests, setRequests] = useState([
    { id: "REQ-001", title: "Character Certificate for Job", type: "Character Certificate", date: "2025-12-10", status: "Approved", verification: "Verified", description: "I need this certificate for my new job application at the bank." },
    { id: "REQ-002", title: "Monthly Income Proof", type: "Income Certificate", date: "2025-12-08", status: "Pending", verification: "Pending", description: "This is for a housing loan requirement." },
    { id: "REQ-003", title: "Gramaniladhari Residence Proof", type: "Residence Certificate", date: "2025-12-05", status: "Pending", verification: "Verified", description: "Required for children's school admission." },
  ]);

  const [formData, setFormData] = useState({ title: "", type: "", description: "" });
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Request title is required";
    if (!formData.type) newErrors.type = "Please select a service type";
    if (!formData.description) newErrors.description = "Description cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newEntry = {
        id: `REQ-00${requests.length + 1}`,
        title: formData.title,
        type: formData.type,
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
        verification: "Pending",
        description: formData.description
      };
      setRequests([newEntry, ...requests]);
      setIsModalOpen(false);
      setFormData({ title: "", type: "", description: "" });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  const handleView = (req) => {
    setViewingRequest(req);
  };

  const buttonStyle = { background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-gray-900 font-bold text-2xl">My Requests</h2>
          <p className="text-gray-500 text-sm">Track and manage all your service requests</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
                <th className="px-6 py-5 text-sm font-bold text-gray-700">Verification</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{req.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{req.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{req.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === "Approved" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.verification === "Verified" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                    }`}>
                      {req.verification}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => handleView(req)}
                        className="text-green-600 hover:scale-110 transition-transform p-1"
                      >
                        <FiEye size={18} />
                      </button>
                      <button className="text-blue-500 hover:scale-110 transition-transform p-1">
                        <FiDownload size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(req.id)}
                        className="text-red-400 hover:scale-110 transition-transform p-1"
                      >
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
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setViewingRequest(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                  <FiInfo className="text-blue-500" />
                  <h3 className="text-lg font-bold text-gray-800">Request Details</h3>
                </div>
                <button onClick={() => setViewingRequest(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Request ID</span>
                  <span className="font-bold text-blue-600">{viewingRequest.id}</span>
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-bold uppercase">Title</label>
                  <p className="text-gray-800 font-bold">{viewingRequest.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 text-xs font-bold uppercase">Type</label>
                    <p className="text-gray-800 text-sm font-medium">{viewingRequest.type}</p>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs font-bold uppercase">Submitted Date</label>
                    <p className="text-gray-800 text-sm font-medium">{viewingRequest.date}</p>
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-bold uppercase">Description</label>
                  <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl mt-1 border border-gray-100 italic">
                    "{viewingRequest.description}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800">New Service Request</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleAddRequest} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Request Title</label>
                  <input 
                    type="text"
                    placeholder="e.g. Need Income Certificate for Bank"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.title ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-purple-500'}`}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Service Type</label>
                  <select 
                    className={`w-full px-4 py-3 rounded-xl border bg-white outline-none ${errors.type ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-purple-500'}`}
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="">Select a service</option>
                    <option value="Character Certificate">Character Certificate</option>
                    <option value="Income Certificate">Income Certificate</option>
                    <option value="Residence Certificate">Residence Certificate</option>
                    <option value="Land Valuation">Land Valuation</option>
                  </select>
                  {errors.type && <p className="text-red-500 text-xs mt-1 font-medium">{errors.type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                  <textarea 
                    rows="4"
                    placeholder="Briefly explain your requirement..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.description ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-purple-500'}`}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>}
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={buttonStyle}
                    className="w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
                  >
                    <FiSend /> Send Request
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MyRequests;