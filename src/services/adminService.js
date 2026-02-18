import api from "./api";

// 📊 Dashboard stats
export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

// 👨‍💼 Get all GNs
export const getAllGNs = async () => {
  const res = await api.get("/admin/gns");
  return res.data;
};

// ❌ Deactivate GN
export const deactivateGN = async (id) => {
  const res = await api.patch(`/admin/gn/${id}/deactivate`);
  return res.data;
};

// ➕ Create GN
export const createGN = async (form) => {
  const payload = {
    email: form.email,
    password: form.password,
    fullName: form.fullName,
    division: form.division,
    // optional
    district: "Colombo", // you can make dynamic later
  };

  const res = await api.post("/admin/create-gn", payload);
  return res.data;
};

// 📥 complaints
export const getAllComplaints = async () => {
  const res = await api.get("/complaints");
  return res.data;
};

// 🔄 update status
export const updateComplaintStatus = async (id, status) => {
  const res = await api.patch(`/complaints/${id}/status`, { status });
  return res.data;
};

// 🔹 admin/gn → get all users
export const getAllUsers = async () => {
  const res = await api.get("/user-profile/all");
  return res.data;
};