import React, { useState } from "react";

const RefreshIco = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ChangePassword = () => {
  const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = () => {
    if (!form.current || !form.newPw || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.newPw !== form.confirm) {
      setError("New passwords do not match.");
      return;
    }
    if (form.newPw.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSuccess(true);
    setForm({ current: "", newPw: "", confirm: "" });
    // TODO: connect backend here
    console.log("Password change submitted");
  };

  const Field = ({ label, fieldKey }) => (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="password"
        value={form[fieldKey]}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
      />
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-md">

        {/* Lock icon circle */}
        <div className="text-center mb-6">
          <div className="w-18 h-18 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center"
            style={{ width: 72, height: 72 }}>
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
          <p className="text-gray-400 text-sm mt-1">Update your account security</p>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-center">
            ✅ Password updated successfully!
          </div>
        )}

        {/* Fields */}
        <Field label="Current Password"     fieldKey="current" />
        <Field label="New Password"         fieldKey="newPw"   />
        <Field label="Confirm New Password" fieldKey="confirm" />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-1"
          style={{ background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" }}
        >
          <RefreshIco /> Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;