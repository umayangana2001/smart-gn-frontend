import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getUserProfile } from "../services/authService";
import api from "../services/api";

// ─────────────────────────────────────────────
// Refresh Icon
// ─────────────────────────────────────────────
const RefreshIco = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 24 24"
    stroke="white"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

// ─────────────────────────────────────────────
// Eye Icon
// ─────────────────────────────────────────────
const EyeIcon = ({ show }) => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="gray"
    strokeWidth={2}
  >
    {show ? (
      <circle cx="12" cy="12" r="3" />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    )}
  </svg>
);

// ─────────────────────────────────────────────
// Input Field (Moved OUTSIDE to prevent re-mounting)
// ─────────────────────────────────────────────
const Field = ({
  label,
  fieldKey,
  form,
  showPassword,
  handleChange,
  toggleShowPassword,
}) => (
  <div className="flex flex-col gap-1.5 mb-5 relative">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <input
        type={showPassword[fieldKey] ? "text" : "password"}
        value={form[fieldKey]}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm
                   outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all pr-10"
      />
      <button
        type="button"
        onClick={() => toggleShowPassword(fieldKey)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <EyeIcon show={showPassword[fieldKey]} />
      </button>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const ChangePassword = () => {
  const [form, setForm] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    newPw: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: "Loading...",
    avatar: null,
  });

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const data = await getUserProfile(userId);
        setUser({
          fullName: data?.fullName || "User",
          avatar: data?.avatar || null,
        });
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Toggle show/hide
  const toggleShowPassword = (key) => {
    setShowPassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Submit password
  const handleSubmit = async () => {
    const { current, newPw, confirm } = form;

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

      const res = await api.patch("/auth/user/change-password", {
        currentPassword: current,
        newPassword: newPw,
      });

      toast.success(res.data?.message || "Password updated successfully!");
      setForm({ current: "", newPw: "", confirm: "" });
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to update password.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Toaster position="top-right" />

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-md">
        {/* User Section */}
        <div className="text-center mb-6">
          <div
            className="mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden"
            style={{ width: 72, height: 72 }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">
                {user.fullName?.charAt(0)}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {user.fullName}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Update your account security
          </p>
        </div>

        {/* Password Fields */}
        <Field
          label="Current Password"
          fieldKey="current"
          form={form}
          showPassword={showPassword}
          handleChange={handleChange}
          toggleShowPassword={toggleShowPassword}
        />

        <Field
          label="New Password"
          fieldKey="newPw"
          form={form}
          showPassword={showPassword}
          handleChange={handleChange}
          toggleShowPassword={toggleShowPassword}
        />

        <Field
          label="Confirm New Password"
          fieldKey="confirm"
          form={form}
          showPassword={showPassword}
          handleChange={handleChange}
          toggleShowPassword={toggleShowPassword}
        />

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2
                     hover:opacity-90 transition-opacity mt-1 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
        >
          {loading ? "Updating..." : (
            <>
              <RefreshIco />
              Update Password
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
