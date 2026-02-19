import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createGN } from "../services/adminService";
import {
  getProvinces,
  getDistricts,
  getDivisions,
} from "../services/locationService";

const CreateVillageOfficer = () => {
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    email: "",
    phone: "",
    provinceId: "",
    districtId: "",
    divisionId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);

  // ---------------------------
  // Load Provinces
  // ---------------------------
  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const data = await getProvinces();
      setProvinces(data);
    } catch {
      toast.error("Failed to load provinces");
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const data = await getDistricts(provinceId);
      setDistricts(data);
      setDivisions([]);
    } catch {
      toast.error("Failed to load districts");
    }
  };

  const fetchDivisions = async (districtId) => {
    try {
      const data = await getDivisions(districtId);
      setDivisions(data);
    } catch {
      toast.error("Failed to load divisions");
    }
  };

  // ---------------------------
  // Handle Change
  // ---------------------------
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));

    if (key === "provinceId") {
      fetchDistricts(value);
      setForm((prev) => ({
        ...prev,
        provinceId: value,
        districtId: "",
        divisionId: "",
      }));
    }

    if (key === "districtId") {
      fetchDivisions(value);
      setForm((prev) => ({
        ...prev,
        districtId: value,
        divisionId: "",
      }));
    }
  };

  // ---------------------------
  // Validation
  // ---------------------------
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";

    if (!form.password)
      newErrors.password = "Password is required";

    if (!form.districtId)
      newErrors.districtId = "Select district";

    if (!form.divisionId)
      newErrors.divisionId = "Select division";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------
  // Submit
  // ---------------------------
  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix form errors");
      return;
    }

    try {
      setLoading(true);

      const selectedDistrict = districts.find(
        (d) => d.id === form.districtId
      );

      const selectedDivision = divisions.find(
        (d) => d.id === form.divisionId
      );

      // ✅ Send ONLY allowed fields
      const payload = {
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        district: selectedDistrict?.name || "",
        division: selectedDivision?.name || "",
      };

      await createGN(payload);

      toast.success("Village Officer created successfully");

      // 🔄 Reset form completely
      setForm({
        fullName: "",
        nic: "",
        email: "",
        phone: "",
        provinceId: "",
        districtId: "",
        divisionId: "",
        password: "",
      });

      setDistricts([]);
      setDivisions([]);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create Village Officer"
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Input Component
  // ---------------------------
  const InputField = ({ label, fieldKey, type = "text" }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={form[fieldKey]}
        onChange={(e) =>
          handleChange(fieldKey, e.target.value)
        }
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none"
      />
      {errors[fieldKey] && (
        <span className="text-xs text-red-500">
          {errors[fieldKey]}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-sm border w-full max-w-3xl">

        <div className="flex items-center gap-3 mb-7">
          <span className="text-2xl">👤</span>
          <h2 className="text-xl font-bold">
            Create Village Officer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <InputField label="Full Name" fieldKey="fullName" />
          <InputField label="NIC Number" fieldKey="nic" />
          <InputField label="Email" fieldKey="email" />
          <InputField label="Phone" fieldKey="phone" />

          {/* Province */}
          <select
            value={form.provinceId}
            onChange={(e) =>
              handleChange("provinceId", e.target.value)
            }
            className="col-span-2 px-4 py-3 rounded-xl border bg-gray-50"
          >
            <option value="">Select Province</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={form.districtId}
            onChange={(e) =>
              handleChange("districtId", e.target.value)
            }
            disabled={!form.provinceId}
            className="col-span-2 px-4 py-3 rounded-xl border bg-gray-50"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Division */}
          <select
            value={form.divisionId}
            onChange={(e) =>
              handleChange("divisionId", e.target.value)
            }
            disabled={!form.districtId}
            className="col-span-2 px-4 py-3 rounded-xl border bg-gray-50"
          >
            <option value="">Select Division</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <InputField
            label="Initial Password"
            fieldKey="password"
            type="password"
          />

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-7 w-full py-4 rounded-xl text-white font-bold"
          style={{
            background:
              "linear-gradient(135deg,#7c6ff7,#6c63ff)",
          }}
        >
          {loading ? "Creating..." : "+ Create Officer Account"}
        </button>

      </div>
    </div>
  );
};

export default CreateVillageOfficer;
