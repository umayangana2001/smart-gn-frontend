import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const Profile = () => {
  const [form, setForm] = useState({
    fullName: "Demo User",
    nic:      "199012345678",
    email:    "dinushi-ps21193@stu.kl.ac.lk",
    phone:    "0768697337",
    address:  "Colombo, Sri Lanka",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSubmit = () => {
    setSaved(true);
    console.log("Profile updated:", form);
    // TODO: connect backend here
  };

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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl overflow-hidden">

        {/* ── Avatar + name section ── */}
        <div className="p-8 pb-6 flex items-center gap-6 border-b border-gray-100">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c6ff7,#a78bfa)" }}
          >
            D
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{form.fullName}</h2>
            <p className="text-gray-500 text-sm mt-0.5">🗂️ Village Officer</p>
            <p className="text-gray-400 text-xs mt-1">Member since January 2024</p>
          </div>
        </div>

        {/* ── Personal Information form ── */}
        <div className="p-8">
          <h3 className="text-base font-bold text-gray-800 mb-5">Personal Information</h3>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Full Name"   fieldKey="fullName" />
            <Field label="NIC Number"  fieldKey="nic" />
            <Field label="Email"       fieldKey="email"   type="email" />
            <Field label="Phone"       fieldKey="phone"   type="tel" />

            {/* Address — full width textarea */}
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

          {/* Success message */}
          {saved && (
            <div className="mt-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-center">
              ✅ Profile updated successfully!
            </div>
          )}

          {/* Submit */}
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


