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
