import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiBell } from "react-icons/fi";

const API = "http://localhost:3000/notifications";

const NotificationBell = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("access_token");

  const userId = user.id;

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // =========================
  // Fetch Unread Count
  // =========================
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
      console.error(
        "Unread count error:",
        err?.response?.data || err.message
      );
    }
  };

  // =========================
  // Fetch Notifications
  // =========================
  const fetchNotifications = async () => {
    if (!userId || !token) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications(res.data);
    } catch (err) {
      console.error(
        "Fetch notifications error:",
        err?.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Mark as Read
  // =========================
  const markAsRead = async (id) => {
    if (!token) return;

    try {
      await axios.patch(
        `${API}/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh after marking read
      fetchUnreadCount();
      fetchNotifications();
    } catch (err) {
      console.error(
        "Mark as read error:",
        err?.response?.data || err.message
      );
    }
  };

  // =========================
  // Load unread count on mount
  // =========================
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  // =========================
  // Toggle Dropdown
  // =========================
  const toggleDropdown = async () => {
    setOpen(!open);

    if (!open) {
      fetchNotifications();
      fetchUnreadCount();
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <div
        className="relative cursor-pointer group"
        onClick={toggleDropdown}
      >
        <FiBell className="text-2xl text-gray-400 group-hover:text-gray-600 transition-colors" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl border p-3 z-50 max-h-96 overflow-y-auto">
          <h4 className="font-semibold mb-2">Notifications</h4>

          {/* Loading State */}
          {loading && (
            <p className="text-sm text-gray-400 text-center py-3">
              Loading notifications...
            </p>
          )}

          {/* Empty State */}
          {!loading && notifications.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-3">
              No notifications
            </p>
          )}

          {/* Notification List */}
          {!loading &&
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-2 rounded-lg mb-2 cursor-pointer text-sm transition ${
                  n.readStatus
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-blue-100 font-medium hover:bg-blue-200"
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
