import React, { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

import { getMyProfile, updateMyProfile } from "../services/authService";

const Profile = ({ userId }) => {
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    email: "",
    phone: "",
    address: "",
    provinceId: "",
    districtId: "",
    divisionId: "",
    birthday: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return; // Prevent calling API with undefined
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile(userId);
      setForm({
        fullName: data.fullName || "",
        nic: data.nic || "",
        email: data.email || "",
        phone: data.telephone || "",
        address: data.address || "",
        provinceId: data.provinceId || "",
        districtId: data.districtId || "",
        divisionId: data.divisionId || "",
        birthday: data.birthday ? data.birthday.split("T")[0] : "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }
    try {
      await updateMyProfile(userId, {
        ...form,
        telephone: form.phone,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  const Field = ({ label, fieldKey, type = "text", fullWidth = false }) => (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[fieldKey]}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
      />
    </div>
  );

  return (
    <div className="flex justify-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl overflow-hidden">
        {/* Avatar + name */}
        <div className="p-8 pb-6 flex items-center gap-6 border-b border-gray-100">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c6ff7,#a78bfa)" }}
          >
            {form.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{form.fullName}</h2>
            <p className="text-gray-500 text-sm mt-0.5">🗂️ Village Officer</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <h3 className="text-base font-bold text-gray-800 mb-5">Personal Information</h3>
          <div className="grid grid-cols-2 gap-5">
            <Field label="Full Name" fieldKey="fullName" />
            <Field label="NIC Number" fieldKey="nic" />
            <Field label="Email" fieldKey="email" type="email" />
            <Field label="Phone" fieldKey="phone" type="tel" />
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 px-8 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
          >
            <FiCheck className="text-base" /> Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
