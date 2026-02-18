import API from "./api";

export const loginUser = async (email, password) => {
  const response = await API.post("/auth/user/login", {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/user/register", userData);
  return response.data;
};

// 🔹 get single profile
export const getUserProfile = async (userId) => {
  const res = await api.get(`/user-profile/${userId}`);
  return res.data;
};

export const getMyProfile = async (userId) => {
  const res = await API.get(`/user-profile/${userId}`);
  return res.data;
};

export const updateMyProfile = async (userId, data) => {
  const res = await API.post(`/user-profile/${userId}`, data);
  return res.data;
};