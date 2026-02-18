import API from "./api"; // centralized axios instance

// ─── GET all requests for this GN officer's division ───
export const getDivisionRequests = async () => {
  const res = await API.get("/service-request/requests");
  return res.data;
};

// ─── GET single request by ID ───
export const getRequestById = async (requestId) => {
  const res = await API.get(`/service-request/request/${requestId}`);
  return res.data;
};

// ─── GN approve/reject request ───
export const gnApproveRejectRequest = async (requestId, action, remarks) => {
  const res = await API.post(`/service-request/gn/request/${requestId}/action`, {
    action,
    remarks,
  });
  return res.data;
};

// ─── Download request document ───
export const downloadRequestDocument = async (requestId) => {
  const res = await API.get(`/service-request/request/${requestId}/download`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `request_${requestId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const getAllRequests = async () => {
  const res = await API.get("/service-request/requests"); // Adjust if needed
  return res.data;
};


// Update request status (GN / Officer)
export const updateRequestStatus = async (requestId, status) => {
  const res = await API.put(`/service-request/request/${requestId}/status`, { status });
  return res.data;
};