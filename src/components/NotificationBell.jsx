import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import axios from "axios";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  const userId = user?.id;

  const API = "http://localhost:3000/notifications";

  const fetchUnreadCount = async () => {
    if (!userId || !token) return;

    try {
      const res = await axios.get(
        `${API}/${userId}/unread-count`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUnreadCount(res.data);
    } catch (err) {
      console.error("Unread count error:", err.message);
    }
  };

 const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) return;

    const res = await axios.get(
      `${API}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Sort newest first
    const sorted = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setNotifications(sorted);

  } catch (err) {
    console.error(
      "Fetch notifications error:",
      err.response?.data || err.message
    );
  }
};


  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${API}/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchUnreadCount();
      fetchNotifications();
    } catch (err) {
      console.error("Mark as read error:", err.message);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const toggleDropdown = async () => {
    setOpen(!open);
    if (!open) {
      fetchNotifications();
    }
  };

  return (
    <div className="relative">
      <div
        className="relative cursor-pointer group"
        onClick={toggleDropdown}
      >
        <FiBell className="text-2xl text-gray-400 group-hover:text-gray-600 transition-colors" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl border p-3 z-50 max-h-96 overflow-y-auto">
          <h4 className="font-semibold mb-2">Notifications</h4>

          {notifications.length === 0 && (
            <p className="text-sm text-gray-500">No notifications</p>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-2 rounded-lg mb-2 cursor-pointer text-sm ${
                n.readStatus
                  ? "bg-gray-100"
                  : "bg-blue-100 font-medium"
              }`}
            >
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
