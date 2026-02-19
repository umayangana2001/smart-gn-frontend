import API from "./api";

export const getProvinces = async () => {
  const response = await API.get("/locations/provinces");
  return response.data;
};

export const getDistricts = async (provinceId) => {
  const response = await API.get(`/locations/districts/${provinceId}`);
  return response.data;
};

export const getDivisions = async (districtId) => {
  const response = await API.get(`/locations/divisions/${districtId}`);
  return response.data;
};
