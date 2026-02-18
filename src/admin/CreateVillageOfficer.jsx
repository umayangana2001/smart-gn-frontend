import React, { useState } from "react";
import toast from "react-hot-toast";
import { createGN } from "../services/adminService";

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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Handle input change
  // -------------------------------
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    // remove error while typing
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // -------------------------------
  // Validation function
  // -------------------------------
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.nic.trim()) {
      newErrors.nic = "NIC is required";
    } else if (!/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(form.nic)) {
      newErrors.nic = "Invalid NIC format";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.division) {
      newErrors.division = "Please select division";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -------------------------------
  // Submit
  // -------------------------------
  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix form errors");
      return;
    }

    try {
      setLoading(true);

      const res = await createGN(form);

      toast.success(res.message || "Village Officer created successfully");

      // reset form
      setForm({
        fullName: "",
        nic: "",
        email: "",
        phone: "",
        division: "",
        password: "",
      });

      setErrors({});
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to create Village Officer";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Input Component
  // -------------------------------
  const InputField = ({ label, fieldKey, type = "text" }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={form[fieldKey]}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
        ${errors[fieldKey]
            ? "border-red-500 bg-red-50 focus:ring-red-200"
            : "border-gray-200 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-100"
          }`}
      />
      {errors[fieldKey] && (
        <span className="text-xs text-red-500">{errors[fieldKey]}</span>
      )}
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-3xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <span className="text-2xl">👤</span>
          <h2 className="text-xl font-bold text-gray-900">
            Create Village Officer
          </h2>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <InputField label="Full Name" fieldKey="fullName" />
          <InputField label="NIC Number" fieldKey="nic" />
          <InputField label="Email" fieldKey="email" type="email" />
          <InputField label="Phone" fieldKey="phone" type="tel" />

          {/* Division */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Division
            </label>
            <select
              value={form.division}
              onChange={(e) => handleChange("division", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
              ${errors.division
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-gray-50"
                }`}
            >
              <option value="">Select Division</option>
              {divisions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.division && (
              <span className="text-xs text-red-500">{errors.division}</span>
            )}
          </div>

          {/* Password */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Initial Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
              ${errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-gray-50"
                }`}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>

        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-7 w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
        >
          {loading ? "Creating..." : "+ Create Officer Account"}
        </button>
      </div>
    </div>
  );
};

export default CreateVillageOfficer;
