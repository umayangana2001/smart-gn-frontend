import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiCheckCircle, FiUser, FiSmartphone, FiMapPin, FiInfo, FiTag } from "react-icons/fi";
import { getAllProvinces, getDistrictsByProvince, getDivisionsByDistrict } from "../services/locationService";
import { getOfficersByDivision, getBusySlots, createAppointment } from "../services/appointmentService";

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

  const availableDates = ["2026-02-20", "2026-02-21", "2026-02-22", "2026-02-25", "2026-02-28"];
  const allTimeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

  useEffect(() => {
    getAllProvinces().then(setProvinces).catch(console.error);
  }, []);

  useEffect(() => {
    if (formData.province) {
      getDistrictsByProvince(formData.province).then(setDistricts).catch(console.error);

      setFormData(prev => ({
        ...prev,
        district: "",
        division: "",
        officerId: "",
        officerName: "",
        time: "",
        date: ""
      }));
      setDistricts([]);
      setDivisions([]);
      setBusySlots([]);
    }
  }, [formData.province]);

  useEffect(() => {
    if (formData.district) {
      getDivisionsByDistrict(formData.district).then(setDivisions).catch(console.error);

      setFormData(prev => ({
        ...prev,
        division: "",
        officerId: "",
        officerName: "",
        time: "",
        date: ""
      }));
      setDivisions([]);
      setBusySlots([]);
    }
  }, [formData.district]);


 useEffect(() => {
    if (formData.division) {
      getOfficersByDivision(formData.division).then(officers => {
        if (officers && officers.length > 0) {
          setFormData(prev => ({ 
            ...prev, 
            officerId: officers[0].id, 
            officerName: officers[0].fullName,
            time: "" 
          }));
        } else {
          setFormData(prev => ({ ...prev, officerId: "", officerName: "", time: "" }));
        }
      }).catch(console.error);
    } else {
      setFormData(prev => ({ ...prev, officerId: "", officerName: "", time: "" }));
    }
  }, [formData.division]);

  useEffect(() => {
    if (formData.officerId && formData.date) {
      getBusySlots(formData.officerId, formData.date).then(data => {
        const bookedTimes = data.map(slot => slot.startTime);
        setBusySlots(bookedTimes);
      }).catch(console.error);
    }
  }, [formData.officerId, formData.date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const re = /^[0-9\b]+$/;
      if (value !== "" && !re.test(value)) return;
      if (value.length > 10) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":");
    let dateObj = new Date();
    dateObj.setHours(parseInt(hours), parseInt(minutes) + 30, 0);
    return `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).every(val => val !== "")) {
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 p-10 rounded-3xl text-center">
            <FiCheckCircle className="mx-auto text-6xl mb-4" />
            <h3 className="font-bold text-2xl mb-2">Request Sent Successfully!</h3>
            <p className="text-lg">We have received your request, <b>{formData.fullName}</b>. Contact: <b>{formData.mobile}</b></p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Inputs */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiUser className="text-purple-500" /> Full Name</label>
                <input type="text" name="fullName" placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" value={formData.fullName} onChange={handleInputChange} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiInfo className="text-purple-500" /> NIC Number</label>
                <input type="text" name="nic" placeholder="E.g. 199012345678" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" value={formData.nic} onChange={handleInputChange} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiSmartphone className="text-purple-500" /> Mobile Number</label>
                <input type="text" name="mobile" placeholder="07XXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" value={formData.mobile} onChange={handleInputChange} />
              </div>

              {/* Appointment Type Dropdown */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiTag className="text-purple-500" /> Appointment Type</label>
                <select name="appointmentType" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={formData.appointmentType} onChange={handleInputChange}>
                  {appointmentTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              {/* Location Selectors */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiMapPin className="text-purple-500" /> Province</label>
                <select name="province" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" value={formData.province} onChange={handleInputChange}>
                  <option value="">Select Province</option>
                  {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
                <select name="district" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" value={formData.district} onChange={handleInputChange} disabled={!formData.province}>
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              {/* Division (Label Changed to GN Division) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">GN Division</label>
                <select name="division" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" value={formData.division} onChange={handleInputChange} disabled={!formData.district}>
                  <option value="">Select GN Division</option>
                  {divisions.map(div => <option key={div.id} value={div.name}>{div.name}</option>)}
                </select>
              </div>

              {/* Officer (ReadOnly - auto selected based on division) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiUser className="text-purple-500" /> Assigned Officer</label>
                <input type="text" readOnly className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 outline-none cursor-not-allowed" value={formData.officerName || "Auto-selected via division"} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiCalendar className="text-purple-500" /> Available Dates</label>
                <select name="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" value={formData.date} onChange={handleInputChange} disabled={!formData.officerId}>
                  <option value="">Select Date</option>
                  {availableDates.map(date => <option key={date} value={date}>{date}</option>)}
                </select>
              </div>
            </div>

            {/* Time Slots with Gray Out Logic */}
            {formData.date && formData.officerId && (
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiClock className="text-purple-500" /> Available Time Slots</label>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                  {allTimeSlots.map((slot) => {
                    const isBusy = busySlots.includes(slot);
                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isBusy}
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`py-2 rounded-xl border transition-all ${isBusy ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" :
                          formData.time === slot ? "bg-purple-600 text-white shadow-md border-purple-600" :
                            "bg-white border-gray-200 hover:border-purple-200"
                          }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Appointment</label>
              <textarea name="reason" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Briefly explain your requirement..." rows="4" value={formData.reason} onChange={handleInputChange}></textarea>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" style={buttonStyle} className="w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
              <FiCheckCircle /> Confirm & Submit Request
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Appointment;