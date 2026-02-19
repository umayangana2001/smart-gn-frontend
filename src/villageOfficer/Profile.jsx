import React, { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

import { getMyProfile, updateMyProfile } from "../services/authService";
import {
  getAllProvinces,
  getDistrictsByProvince,
  getDivisionsByDistrict,
} from "../services/locationService";

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

  useEffect(() => {
    if (!userId) return;
    fetchProfile();
    loadProvinces();
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

      if (data.provinceId) await loadDistricts(data.provinceId);
      if (data.districtId) await loadDivisions(data.districtId);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const loadProvinces = async () => {
    try {
      const provinces = await getAllProvinces();
      setLocations((prev) => ({ ...prev, provinces }));
    } catch (err) {
      console.error("Error fetching provinces:", err);
    }
  };

  const loadDistricts = async (provinceId) => {
    try {
      const districts = await getDistrictsByProvince(provinceId);
      setLocations((prev) => ({ ...prev, districts, divisions: [] }));
    } catch (err) {
      console.error("Error fetching districts:", err);
    }
  };

  const loadDivisions = async (districtId) => {
    try {
      const divisions = await getDivisionsByDistrict(districtId);
      setLocations((prev) => ({ ...prev, divisions }));
    } catch (err) {
      console.error("Error fetching divisions:", err);
    }
  };

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));

    if (key === "provinceId") {
      setForm((prev) => ({
        ...prev,
        provinceId: val,
        districtId: "",
        divisionId: "",
      }));
      loadDistricts(val);
    }

    if (key === "districtId") {
      setForm((prev) => ({
        ...prev,
        districtId: val,
        divisionId: "",
      }));
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
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex justify-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl overflow-hidden">
        <div className="p-8 pb-6 flex items-center gap-6 border-b border-gray-100">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl"
            style={{ background: "linear-gradient(135deg,#7c6ff7,#a78bfa)" }}
          >
            {form.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {form.fullName}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              🗂️ Village Officer
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-5">
            <input
              value={form.fullName}
              onChange={(e) =>
                handleChange("fullName", e.target.value)
              }
              placeholder="Full Name"
              className="col-span-2 px-4 py-3 rounded-xl border"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 px-8 py-3 rounded-xl text-white font-bold"
            style={{
              background: "linear-gradient(135deg,#7c6ff7,#6c63ff)",
            }}
          >
            <FiCheck /> Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
