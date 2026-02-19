import React, { useEffect, useState } from "react";
import {
  getServiceTypes,
  createServiceType,
  updateServiceType,
  deleteServiceType,
} from "../services/ServiceTypeService";

const ServiceTypes = () => {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadTypes = async () => {
    try {
      const data = await getServiceTypes();
      setTypes(data);
    } catch (err) {
      alert("Failed to load service types");
    }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Name is required");

    try {
      if (editingId) {
        await updateServiceType(editingId, {
          name,
          description,
          isActive: true,
        });
        alert("Updated successfully!");
      } else {
        await createServiceType({
          name,
          description,
          isActive: true,
        });
        alert("Created successfully!");
      }

      setName("");
      setDescription("");
      setEditingId(null);
      loadTypes();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (type) => {
    setEditingId(type.id);
    setName(type.name);
    setDescription(type.description || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service type?")) return;

    try {
      await deleteServiceType(id);
      alert("Deleted successfully!");
      loadTypes();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Service Types</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-xl mb-8 space-y-4"
      >
        <input
          type="text"
          placeholder="Service Type Name"
          className="w-full border p-3 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          {editingId ? "Update Service Type" : "Add Service Type"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id} className="border-t">
                <td className="p-4 font-semibold">{type.name}</td>
                <td className="p-4">{type.description}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(type)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(type.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {types.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No service types found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTypes;
