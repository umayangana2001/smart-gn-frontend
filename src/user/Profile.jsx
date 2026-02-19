import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiUpload, FiSave, FiFileText, FiTrash2, FiEye, FiCalendar, FiUser, FiMapPin, FiPhone ,FiMail  } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

import { getMyProfile, updateMyProfile } from "../services/authService";
import { getAllProvinces, getDistrictsByProvince, getDivisionsByDistrict } from "../services/locationService";
import { uploadUserFile, deleteUserFile, getFileViewUrl } from "../services/fileService";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "", address: "", provinceId: "", districtId: "", divisionId: "",
    nic: "", telephone: "", day: "", month: "", year: "", email: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        const [data, provinceList] = await Promise.all([
          getMyProfile(user.id),
          getAllProvinces()
        ]);

        setProvinces(provinceList);
        let d = "", m = "", y = "";
        if (data.birthday) {
          const date = new Date(data.birthday);
          y = date.getFullYear().toString();
          m = (date.getMonth() + 1).toString().padStart(2, '0');
          d = date.getDate().toString().padStart(2, '0');
        }

        setProfile({
          fullName: data.fullName || "",
          address: data.address || "",
          provinceId: data.provinceId || "",
          districtId: data.districtId || "",
          divisionId: data.divisionId || "",
          nic: data.nic || "",
          telephone: data.telephone || "",
          email: data.email || "",
          day: d, month: m, year: y
        });

        if (data.provinceId) {
          const dists = await getDistrictsByProvince(data.provinceId);
          setDistricts(dists);
        }
        if (data.districtId) {
          const divs = await getDivisionsByDistrict(data.districtId);
          setDivisions(divs);
        }
        
        if (data.documents) setUploadedDocs(data.documents);

      } catch (err) {
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "telephone") {
      const re = /^[0-9\b]+$/;
      if (value !== "" && !re.test(value)) return;
      if (value.length > 10) return;
    }
    setProfile(prev => ({ ...prev, [name]: value }));

    if (name === "provinceId") {
      setDistricts([]); setDivisions([]);
      if (value) {
        const data = await getDistrictsByProvince(value);
        setDistricts(data);
      }
    }
    if (name === "districtId") {
      setDivisions([]);
      if (value) {
        const data = await getDivisionsByDistrict(value);
        setDivisions(data);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const user = JSON.parse(localStorage.getItem("user"));

    for (const file of files) {
      const tId = toast.loading(`Uploading ${file.name}...`);
      try {
        const res = await uploadUserFile(user.id, file);
        setUploadedDocs(prev => [...prev, res]);
        toast.success("Uploaded!", { id: tId });
      } catch (err) {
        toast.error("Upload failed", { id: tId });
      }
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm("Delete this file?")) return;
    const tId = toast.loading("Deleting...");
    try {
      await deleteUserFile(fileId);
      setUploadedDocs(prev => prev.filter(d => d.id !== fileId));
      toast.success("Deleted!", { id: tId });
    } catch (err) {
      toast.error("Delete failed", { id: tId });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const bday = (profile.year && profile.month && profile.day) 
                 ? `${profile.year}-${profile.month.padStart(2, '0')}-${profile.day.padStart(2, '0')}` : null;
    const { day, month, year, ...cleanProfile } = profile;
    try {
      await updateMyProfile(user.id, { ...cleanProfile, birthday: bday });
      toast.success("Profile saved!");
    } catch (err) {
      toast.error("Failed to save");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <Toaster />
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
              <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> Address
              </label>
              <textarea name="address" rows="1" value={profile.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> Province
              </label>
              <select name="provinceId" value={profile.provinceId} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none">
                <option value="">Select Province</option>
                {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> District
              </label>
              <select name="districtId" value={profile.districtId} onChange={handleInputChange} disabled={!profile.provinceId} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none">
                <option value="">Select District</option>
                {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMapPin className="text-purple-500" /> Division
              </label>
              <select name="divisionId" value={profile.divisionId} onChange={handleInputChange} disabled={!profile.districtId} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none">
                <option value="">Select Division</option>
                {divisions.map(dv => <option key={dv.id} value={dv.id}>{dv.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiFileText className="text-purple-500" /> NIC No
              </label>
              <input type="text" name="nic" value={profile.nic} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiPhone className="text-purple-500" /> Contact
              </label>
              <input type="text" name="telephone" placeholder="07XXXXXXXX" value={profile.telephone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiCalendar className="text-purple-500" /> Birth Date
              </label>
              <div className="flex gap-2">
                <input type="text" name="day" placeholder="DD" maxLength="2" className="w-full px-2 py-3 text-center rounded-xl border border-gray-200 outline-none" value={profile.day} onChange={(e) => setProfile({...profile, day: e.target.value})} />
                <input type="text" name="month" placeholder="MM" maxLength="2" className="w-full px-2 py-3 text-center rounded-xl border border-gray-200 outline-none" value={profile.month} onChange={(e) => setProfile({...profile, month: e.target.value})} />
                <input type="text" name="year" placeholder="YYYY" maxLength="4" className="w-full px-4 py-3 text-center rounded-xl border border-gray-200 outline-none" value={profile.year} onChange={(e) => setProfile({...profile, year: e.target.value})} />
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMail className="text-purple-500" /> Email
              </label>
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }} className="text-white font-bold px-10 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-200">
              <FiSave /> Save
            </motion.button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 font-bold text-lg mb-6">Document Uploads</h2>
        
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors relative">
          <input type="file" id="file-upload" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} />
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-4">
              <FiUpload className="text-2xl text-white" />
            </div>
            <p className="font-bold text-gray-700">Upload Documents</p>
            <p className="text-gray-400 text-sm mt-1">Drag and drop files here or click to browse</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Uploaded Files</h3>
          <div className="space-y-3">
            {uploadedDocs.map((doc, index) => (
              <div key={doc.id || index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FiFileText className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">{doc.documentName}</p>
                    <p className="text-xs text-gray-400">Verified</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.open(getFileViewUrl(doc.filePath), "_blank")}
                    className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                  >
                    <FiEye size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteFile(doc.id)}
                    className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                  >
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