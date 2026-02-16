
import React, { useState } from "react";

const divisions = [
  "Colombo North",
  "Colombo South",
  "Gampaha East",
  "Kandy Central",
  "Negombo",
  "Kurunegala",
];

const CreateVillageOfficer = () => {
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    email: "",
    phone: "",
    division: "",
    password: "",
  });

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log("Create officer:", form);
    // TODO: connect backend here
  };

  const InputField = ({ label, fieldKey, type = "text" }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
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
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <span className="text-2xl">👤</span>
          <h2 className="text-xl font-bold text-gray-900">Create Village Officer</h2>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField label="Full Name"   fieldKey="fullName" />
          <InputField label="NIC Number"  fieldKey="nic" />
          <InputField label="Email"       fieldKey="email"    type="email" />
          <InputField label="Phone"       fieldKey="phone"    type="tel" />

          {/* Division – full width */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Division</label>
            <select
              value={form.division}
              onChange={(e) => handleChange("division", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              style={{ color: form.division ? "#111827" : "#9ca3af" }}
            >
              <option value="">Select Division</option>
              {divisions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Initial Password – full width */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Initial Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-7 w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
        >
          <span className="text-lg">+</span> Create Officer Account
        </button>
      </div>
    </div>
  );
};

export default CreateVillageOfficer;

