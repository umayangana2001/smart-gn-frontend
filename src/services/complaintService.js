import api from "./api";


export const createComplaint = async (formData) => {
  const payload = {
    title: formData.title,
    description: formData.description,
  };

  const res = await api.post("/complaints", payload);
  return res.data;
};