import API from "./api";

// Get provinces
export const getProvinces = async () => {
  const res = await API.get("/locations/provinces");
  return res.data;
};

// Get districts
export const getDistricts = async (provinceId) => {
  const res = await API.get(`/locations/districts/${provinceId}`);
  console.log("Districts for province", provinceId, res.data);
  return res.data;
};

// Get divisions
export const getDivisions = async (districtId) => {
  const res = await API.get(`/locations/divisions/${districtId}`);
    console.log("Divisions for district", districtId, res.data);
  return res.data;
};
