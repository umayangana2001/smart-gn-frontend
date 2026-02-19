import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getUserProfile } from "../services/authService";
import API from "../services/api";


// ─── Refresh Icon ───
const RefreshIco = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const ChangePassword = () => {
  const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ fullName: "Loading...", avatar: null });

  // ─── Fetch current user profile ───
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId"); // store userId on login
        if (!userId) return;
        const data = await getUserProfile(userId);
        setUser({ fullName: data.fullName, avatar: data.avatar });
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    fetchUser();
  }, []);

  // handle form change
  const handleChange = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  // handle password update
  const handleSubmit = async () => {
    const { current, newPw, confirm } = form;

    // ✅ Basic validation
    if (!current || !newPw || !confirm) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPw !== confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPw.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.patch("/auth/user/change-password", {
        currentPassword: current,
        newPassword: newPw,
      });
      toast.success(res.data.message || "Password updated successfully!");
      setForm({ current: "", newPw: "", confirm: "" });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to update password.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ─── Input Field Component ───
  const Field = ({ label, fieldKey }) => (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="password"
        value={form[fieldKey]}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
      />
    </div>
  );

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50 p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-md">

        {/* User avatar */}
        <div className="text-center mb-6">
          <div
            className="w-18 h-18 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden"
            style={{ width: 72, height: 72 }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">{user.fullName?.charAt(0)}</span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
          <p className="text-gray-400 text-sm mt-1">Update your account security</p>
        </div>

        {/* Form Fields */}
        <Field label="Current Password" fieldKey="current" />
        <Field label="New Password" fieldKey="newPw" />
        <Field label="Confirm New Password" fieldKey="confirm" />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2
                     hover:opacity-90 transition-opacity mt-1"
          style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
        >
          {loading ? "Updating..." : <><RefreshIco /> Update Password</>}
        </button>

      </div>
    </div>
  );
};

export default ChangePassword;
