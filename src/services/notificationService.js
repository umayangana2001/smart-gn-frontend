import axios from "axios";

const API = "http://localhost:3000/notifications";

export const getUnreadCount = async (userId, token) => {
  const response = await axios.get(
    `${API}/${userId}/unread-count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getNotifications = async (userId, token) => {
  const response = await axios.get(
    `${API}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const markAsRead = async (id, token) => {
  await axios.patch(
    `${API}/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
