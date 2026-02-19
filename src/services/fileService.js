import API from "./api";

// Upload file
export const uploadUserFile = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await API.post(`/file-upload/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

//  Get user files
export const getUserFiles = async (userId) => {
  const response = await API.get(`/file-upload/user/${userId}`);
  return response.data;
};

//  Delete file
export const deleteUserFile = async (fileId) => {
  const response = await API.delete(`/file-upload/${fileId}`);
  return response.data;
};

export const getFileViewUrl = (fullPath) => {
  if (!fullPath) return "#";
  const fileName = fullPath.split(/[\\/]/).pop(); 
  return `http://localhost:3000/uploads/${fileName}`;
};