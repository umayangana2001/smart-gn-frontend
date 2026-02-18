import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiCheckCircle, FiUser, FiSmartphone, FiMapPin, FiInfo } from "react-icons/fi";

const Appointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    mobile: "",
    province: "",
    district: "",
    town: "",
    date: "",
    time: "",
    reason: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const provinces = [
    "Central", "Eastern", "North Central", "Northern",
    "North Western", "Sabaragamuwa", "Southern", "Uva", "Western"
  ];

  // Officer working dates (ONLY these are selectable)
  const availableDates = [
    "2026-02-20",
    "2026-02-21",
    "2026-02-22",
    "2026-02-25",
    "2026-02-28"
  ];

  // Already booked time slots
  const bookedSlots = {
    "2026-02-20": ["09:00", "11:00"],
    "2026-02-22": ["14:00"]
  };

  // Daily time slots
  const allTimeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  // Filter available time slots
  const availableSlots = formData.date
    ? allTimeSlots.filter(
        (time) => !bookedSlots[formData.date]?.includes(time)
      )
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const re = /^[0-9\b]+$/;
      if (value !== "" && !re.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "date") {
      if (!availableDates.includes(value)) {
        alert("Selected date is not available.");
        return;
      }
      setFormData({ ...formData, date: value, time: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).every(val => val !== "")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } else {
      alert("Please fill all the fields!");
    }
  };

  const buttonStyle = { background: "linear-gradient(135deg,#7c6ff7,#6c63ff)" };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">

      <h1 className="text-2xl font-bold text-gray-800 px-2">Book an Appointment</h1>
      <p className="text-gray-500 text-sm px-2 -mt-4">Please provide your details to schedule a meeting.</p>

      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 p-10 rounded-3xl text-center"
          >
            <FiCheckCircle className="mx-auto text-6xl mb-4" />
            <h3 className="font-bold text-2xl mb-2">Request Sent Successfully!</h3>
            <p className="text-lg">
              We have received your appointment request, <b>{formData.fullName}</b>.
              We will contact you on <b>{formData.mobile}</b> soon.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FiUser className="text-purple-500" /> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FiInfo className="text-purple-500" /> NIC Number
                </label>
                <input
                  type="text"
                  name="nic"
                  placeholder="E.g. 199012345678"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  value={formData.nic}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FiSmartphone className="text-purple-500" /> Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="07XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FiMapPin className="text-purple-500" /> Province
                </label>
                <select
                  name="province"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
                  value={formData.province}
                  onChange={handleInputChange}
                >
                  <option value="">Select Province</option>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
                <input
                  type="text"
                  name="district"
                  placeholder="Enter District"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  value={formData.district}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Town / City</label>
                <input
                  type="text"
                  name="town"
                  placeholder="Enter your town"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  value={formData.town}
                  onChange={handleInputChange}
                />
              </div>

              {/* Available Date Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FiCalendar className="text-purple-500" /> Available Dates
                </label>
                <select
                  name="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
                  value={formData.date}
                  onChange={handleInputChange}
                >
                  <option value="">Select Available Date</option>
                  {availableDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>

              {/* Available Time Slots */}
              {formData.date && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <FiClock className="text-purple-500" /> Available Time Slots
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() =>
                            setFormData({ ...formData, time: slot })
                          }
                          className={`py-2 rounded-xl border transition-all ${
                            formData.time === slot
                              ? "bg-purple-600 text-white"
                              : "bg-white border-gray-200 hover:bg-purple-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 col-span-3">
                        No available slots for this date
                      </p>
                    )}
                  </div>
                </div>
              )}

            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Reason for Appointment
              </label>
              <textarea
                name="reason"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="Briefly explain why you need this appointment..."
                rows="4"
                value={formData.reason}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={buttonStyle}
              className="w-full text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-100 transition-all flex items-center justify-center gap-2"
            >
              <FiCheckCircle /> Confirm & Submit Request
            </motion.button>

          </form>
        )}
      </div>
    </div>
  );
};

export default Appointment;
