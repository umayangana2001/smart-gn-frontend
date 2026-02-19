import API from "./api";

export const getAllProvinces = async () => {
  const response = await API.get("/locations/provinces");
  return response.data;
};

export const getDistrictsByProvince = async (provinceId) => {
  const response = await API.get(`/locations/districts/${provinceId}`);
  return response.data;
};

export const getDivisionsByDistrict = async (districtId) => {
  const response = await API.get(`/locations/divisions/${districtId}`);
  return response.data;
};
