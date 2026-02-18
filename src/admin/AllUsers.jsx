import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllUsers } from "../services/adminService";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch {
        toast.error("Failed to load users");
      }
    };
    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow border mt-10">
      <h2 className="text-lg font-bold mb-6">All Users</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b text-left">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="py-3">{u.id}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.profile?.phone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
