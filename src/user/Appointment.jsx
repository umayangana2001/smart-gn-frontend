import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiSmartphone,
  FiMapPin,
  FiInfo,
  FiTag
} from "react-icons/fi";

import {
  getProvinces,
  getDistricts,
  getDivisions
} from "../services/locationService";

import {
  getOfficersByDivision,
  getBusySlots,
  createAppointment
} from "../services/appointmentService";

const Appointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    mobile: "",
    province: "",
    district: "",
    division: "",
    officerId: "",
    officerName: "",
    appointmentType: "GENERAL_INQUIRY",
    date: "",
    time: "",
    reason: ""
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [busySlots, setBusySlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const appointmentTypes = [
    { id: "GENERAL_INQUIRY", name: "General Inquiry" },
    { id: "DOCUMENT_REQUEST", name: "Document Request" },
    { id: "COMPLAINT", name: "Complaint / Grievance" },
    { id: "CERTIFICATE_ISSUANCE", name: "Certificate Issuance" },
    { id: "MEETING", name: "Official Meeting" },
    { id: "OTHER", name: "Other Purpose" }
  ];

  const availableDates = [
    "2026-02-20",
    "2026-02-21",
    "2026-02-22",
    "2026-02-25",
    "2026-02-28"
  ];

  const allTimeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  // 🔹 Load Provinces
  useEffect(() => {
    getProvinces().then(setProvinces).catch(console.error);
  }, []);

  // 🔹 Province → Load Districts
  useEffect(() => {
    if (!formData.province) return;

    getDistricts(formData.province)
      .then(setDistricts)
      .catch(console.error);

    setFormData(prev => ({
      ...prev,
      district: "",
      division: "",
      officerId: "",
      officerName: "",
      date: "",
      time: ""
    }));

    setDivisions([]);
    setBusySlots([]);
  }, [formData.province]);

  // 🔹 District → Load Divisions
  useEffect(() => {
    if (!formData.district) return;

    getDivisions(formData.district)
      .then(setDivisions)
      .catch(console.error);

    setFormData(prev => ({
      ...prev,
      division: "",
      officerId: "",
      officerName: "",
      date: "",
      time: ""
    }));

    setBusySlots([]);
  }, [formData.district]);

  // 🔹 Division → Auto Assign Officer
  useEffect(() => {
    if (!formData.division) return;

    getOfficersByDivision(formData.division)
      .then(officers => {
        if (officers && officers.length > 0) {
          setFormData(prev => ({
            ...prev,
            officerId: officers[0].id,
            officerName: officers[0].fullName,
            time: ""
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            officerId: "",
            officerName: "",
            time: ""
          }));
        }
      })
      .catch(console.error);
  }, [formData.division]);

  // 🔹 Load Busy Slots
  useEffect(() => {
    if (!formData.officerId || !formData.date) return;

    getBusySlots(formData.officerId, formData.date)
      .then(data => {
        const bookedTimes = data.map(slot => slot.startTime);
        setBusySlots(bookedTimes);
      })
      .catch(console.error);
  }, [formData.officerId, formData.date]);

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const re = /^[0-9\b]+$/;
      if (value !== "" && !re.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateEndTime = startTime => {
    const [hours, minutes] = startTime.split(":");
    const dateObj = new Date();
    dateObj.setHours(parseInt(hours), parseInt(minutes) + 30, 0);
    return `${String(dateObj.getHours()).padStart(2, "0")}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.values(formData).some(val => val === "")) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const payload = {
        title: `Appointment: ${formData.fullName}`,
        description: formData.reason,
        date: new Date(formData.date).toISOString(),
        startTime: formData.time,
        endTime: calculateEndTime(formData.time),
        appointmentType: formData.appointmentType,
        officerId: formData.officerId
      };

      await createAppointment(payload);
      setSubmitted(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create appointment!");
    }
  };

  const buttonStyle = {
    background: "linear-gradient(135deg,#7c6ff7,#6c63ff)"
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <h1 className="text-2xl font-bold text-gray-800 px-2">
        Book an Appointment
      </h1>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {submitted ? (
          <motion.div className="text-center p-10">
            <FiCheckCircle className="mx-auto text-6xl mb-4 text-green-500" />
            <h3 className="font-bold text-2xl mb-2">
              Request Sent Successfully!
            </h3>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Province */}
            <select
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border"
            >
              <option value="">Select Province</option>
              {provinces.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              disabled={!formData.province}
              className="w-full px-4 py-3 rounded-xl border"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Division */}
            <select
              name="division"
              value={formData.division}
              onChange={handleInputChange}
              disabled={!formData.district}
              className="w-full px-4 py-3 rounded-xl border"
            >
              <option value="">Select GN Division</option>
              {divisions.map(div => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={buttonStyle}
              className="w-full text-white font-bold py-4 rounded-xl"
            >
              <FiCheckCircle /> Confirm & Submit
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Appointment;
