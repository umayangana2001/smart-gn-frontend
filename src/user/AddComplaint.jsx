import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiSend, FiAlertCircle, FiType, FiMessageSquare } from "react-icons/fi"; 
import { createComplaint } from "../services/complaintService";

const AddComplaint = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await createComplaint(formData); 
        alert("Complaint submitted successfully!");
        setFormData({ title: "", description: "" });
      } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit complaint. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="px-2">
        <h1 className="text-2xl font-bold text-gray-800">Submit a New Complaint</h1>
        <p className="text-gray-500 text-sm mt-1">Please describe your issue in detail for better assistance.</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 font-bold text-lg mb-6">Complaint Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiType className="text-purple-500" /> Complaint Title
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                placeholder="Brief title of your issue..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiAlertCircle /> {errors.title}
                </p>
              )}
            </div>

            {/* <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiTag className="text-purple-500" /> Category
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>General</option>
                <option>Land Issue</option>
                <option>Water/Electricity</option>
                <option>Public Nuisance</option>
              </select>
            </div> 
            */}

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMessageSquare className="text-purple-500" /> Detailed Description
              </label>
              <textarea
                rows="5"
                className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                placeholder="Explain your issue in detail so we can help you better..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiAlertCircle /> {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading} 
              type="submit"
              style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
              className={`text-white font-bold px-10 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-100 w-full md:w-auto ${loading ? 'opacity-70' : ''}`}
            >
              <FiSend /> {loading ? "Submitting..." : "Submit Complaint"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddComplaint;