import API from "./api";

export const getOfficersByDivision = async (divisionId) => {
  const response = await API.get(`/appointments/available-officers/${divisionId}`);
  return response.data;
};

export const getBusySlots = async (officerId, date) => {
  const response = await API.get(`/appointments/busy-slots?officerId=${officerId}&date=${date}`);
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await API.post("/appointments", appointmentData);
  return response.data;
};