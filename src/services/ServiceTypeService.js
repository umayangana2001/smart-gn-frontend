import axios from "axios";

const API = "http://localhost:3000/service-request";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

// GET ALL
export const getServiceTypes = async () => {
  const res = await axios.get(`${API}/service-types`, authHeader());
  return res.data;
};

// CREATE
export const createServiceType = async (data) => {
  const res = await axios.post(
    `${API}/service-type`,
    data,
    authHeader()
  );
  return res.data;
};

// UPDATE
export const updateServiceType = async (id, data) => {
  const res = await axios.put(
    `${API}/service-type/${id}`,
    data,
    authHeader()
  );
  return res.data;
};

// DELETE
export const deleteServiceType = async (id) => {
  const res = await axios.delete(
    `${API}/service-type/${id}`,
    authHeader()
  );
  return res.data;
};
