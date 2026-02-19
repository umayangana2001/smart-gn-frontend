import React, { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

import { getMyProfile, updateMyProfile } from "../services/authService";
import { getDistricts, getDivisions, getProvinces } from "../services/locationService";


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
  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    divisions: [],
  });

  // Load profile and provinces on mount
  useEffect(() => {
    if (!userId) return;
    fetchProfile();
    loadProvinces();
  }, [userId]);

  // Fetch user profile
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

      // Load districts & divisions if profile already has IDs
      if (data.provinceId) await loadDistricts(data.provinceId);
      if (data.districtId) await loadDivisions(data.districtId);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Load provinces
  const loadProvinces = async () => {
    try {
      const provinces = await getProvinces();
      setLocations((prev) => ({ ...prev, provinces }));
    } catch (err) {
      console.error("Error fetching provinces:", err);
    }
  };

  // Load districts based on province
  const loadDistricts = async (provinceId) => {
    try {
      const districts = await getDistricts(provinceId);
      setLocations((prev) => ({ ...prev, districts, divisions: [] }));
    } catch (err) {
      console.error("Error fetching districts:", err);
    }
  };

  // Load divisions based on district
  const loadDivisions = async (districtId) => {
    try {
      const divisions = await getDivisions(districtId);
      setLocations((prev) => ({ ...prev, divisions }));
    } catch (err) {
      console.error("Error fetching divisions:", err);
    }
  };

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));

    // Cascade dropdowns
    if (key === "provinceId") {
      handleChange("districtId", "");
      handleChange("divisionId", "");
      loadDistricts(val);
    }
    if (key === "districtId") {
      handleChange("divisionId", "");
      loadDivisions(val);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    if (!form.address.trim()) {
      toast.error("Address must be provided");
      return;
    }
    if (!form.provinceId || !form.districtId || !form.divisionId) {
      toast.error("Please select valid province, district, and division");
      return;
    }

    const payload = {
      fullName: form.fullName,
      nic: form.nic,
      email: form.email,
      telephone: form.phone,
      address: form.address,
      provinceId: form.provinceId,
      districtId: form.districtId,
      divisionId: form.divisionId,
      birthday: form.birthday,
    };

    try {
      await updateMyProfile(userId, payload);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      const msg = err.response?.data?.message || "Failed to update profile";
      toast.error(msg);
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

            {/* Province */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Province</label>
              <select
                value={form.provinceId}
                onChange={(e) => handleChange("provinceId", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                <option value="">Select Province</option>
                {locations.provinces.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">District</label>
              <select
                value={form.districtId}
                onChange={(e) => handleChange("districtId", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                <option value="">Select District</option>
                {locations.districts.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Division</label>
              <select
                value={form.divisionId}
                onChange={(e) => handleChange("divisionId", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                <option value="">Select Division</option>
                {locations.divisions.map((div) => (
                  <option key={div.id} value={div.id}>{div.name}</option>
                ))}
              </select>
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
