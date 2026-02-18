import api from "./api";

export const getMyServiceRequests = async (userId) => {
  const res = await api.get(`/service-request/requests/${userId}`);
  return res.data;
};

export const createServiceRequest = async (userId, payload) => {
  const res = await api.post(`/service-request/request/${userId}`, payload);
  return res.data;
};

export const getServiceTypes = async () => {
  const res = await api.get("/service-request/service-types");
  return res.data;
};

export const deleteServiceRequest = async (requestId, userId) => {
  const res = await api.delete(`/service-request/request/${requestId}/${userId}`);
  return res.data;
};