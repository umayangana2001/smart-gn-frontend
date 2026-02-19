import axios from "axios";

const API = "http://localhost:3000/service-request";

const getToken = () => localStorage.getItem("token");

export const getServiceTypes = async () => {
  const res = await axios.get(`${API}/service-types`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const createServiceType = async (data) => {
  const res = await axios.post(
    `${API}/service-type`,
    data,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return res.data;
};

export const deleteServiceType = async (id) => {
  const res = await axios.delete(
    `${API}/service-type/${id}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return res.data;
};
