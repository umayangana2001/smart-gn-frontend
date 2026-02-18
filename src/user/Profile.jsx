import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiUpload, FiSave, FiFileText, FiTrash2, FiEye, FiCalendar, FiUser, FiMapPin, FiPhone ,FiMail  } from "react-icons/fi";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    address: "",
    province: "",
    district: "",
    division: "",
    nicNo: "",
    contact: "",
    birthDate: { day: "", month: "", year: "" },
    email: "",
  });

  const provinces = [
    "Central", "Eastern", "North Central", "Northern", 
    "North Western", "Sabaragamuwa", "Southern", "Uva", "Western"
  ];

  const [uploadedDocs, setUploadedDocs] = useState([
    { name: "", size: "" },
    { name: "", size: "" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      const re = /^[0-9\b]+$/;
      if (value !== "" && !re.test(value)) return;
      if (value.length > 10) return;
    }

    setProfile({ ...profile, [name]: value });
  };

  const handleBirthDateChange = (e) => {
    const { name, value } = e.target;
    const re = /^[0-9\b]+$/;
    if (value !== "" && !re.test(value)) return;

    setProfile({
      ...profile,
      birthDate: { ...profile.birthDate, [name]: value }
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB"
    }));
    setUploadedDocs([...uploadedDocs, ...files]);
  };

  const removeDoc = (index) => {
    setUploadedDocs(uploadedDocs.filter((_, i) => i !== index));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile details saved successfully!");
  };

 return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <h1 className="text-2xl font-bold text-gray-800 px-2">My Info</h1>
      <p className="text-gray-500 text-sm px-2 -mt-4">Manage your personal information and documents</p>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 font-bold text-lg mb-6">Personal Information</h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiUser className="text-purple-500" /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> Address
              </label>
              <textarea
                name="address"
                rows="1"
                value={profile.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> Province
              </label>
              <select 
                name="province"
                value={profile.province}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
              >
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> District
              </label>
              <select 
                name="district"
                value={profile.district}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
              >
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> Division
              </label>
              <select 
                name="division"
                value={profile.division}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
              >
                <option value="Colombo Central">Colombo Central</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiFileText className="text-purple-500" /> NIC No
              </label>
              <input
                type="text"
                name="nicNo"
                value={profile.nicNo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiPhone className="text-purple-500" /> Contact
              </label>
              <input
                type="text"
                name="contact"
                placeholder="07XXXXXXXX"
                value={profile.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiCalendar className="text-purple-500" /> Birth Date
              </label>
              <div className="flex gap-2">
                <input type="text" name="day" placeholder="DD" maxLength="2" className="w-full px-2 py-3 text-center rounded-xl border border-gray-200 outline-none" value={profile.birthDate.day} onChange={handleBirthDateChange} />
                <input type="text" name="month" placeholder="MM" maxLength="2" className="w-full px-2 py-3 text-center rounded-xl border border-gray-200 outline-none" value={profile.birthDate.month} onChange={handleBirthDateChange} />
                <input type="text" name="year" placeholder="YYYY" maxLength="4" className="w-full px-4 py-3 text-center rounded-xl border border-gray-200 outline-none" value={profile.birthDate.year} onChange={handleBirthDateChange} />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMail className="text-purple-500" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
              className="text-white font-bold px-10 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              <FiSave /> Save
            </motion.button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 font-bold text-lg mb-6">Document Uploads</h2>
        
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors relative">
          <input
            type="file"
            id="file-upload"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileUpload}
          />
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-4">
              <FiUpload className="text-2xl text-white" />
            </div>
            <p className="font-bold text-gray-700">Upload Documents</p>
            <p className="text-gray-400 text-sm mt-1">Drag and drop files here or click to browse</p>
            <p className="text-gray-300 text-xs mt-1 italic">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Uploaded Files</h3>
          <div className="space-y-3">
            {uploadedDocs.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FiFileText className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">{doc.name}</p>
                    <p className="text-xs text-gray-400">Uploaded today</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors" title="View Document">
                    <FiEye size={18} />
                  </button>
                  <button onClick={() => removeDoc(index)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors" title="Delete Document">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;