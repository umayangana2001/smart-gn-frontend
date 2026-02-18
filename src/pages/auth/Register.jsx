import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo/smart-gn-logo.png";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        nic: formData.nic,
        telephone: formData.phone, // Backend expects telephone
      };

      await registerUser(payload);

      alert("Registration successful!");

      // Reset form
      setFormData({
        fullName: "",
        nic: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");

    } catch (error) {
      console.error("Register Error:", error);

      const message =
        error.response?.data?.message || "Registration failed";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen relative flex items-center justify-center bg-white overflow-hidden px-6 py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <Link 
  to="/home"
  className="absolute top-6 left-6 z-50 flex items-center gap-2 text-primary font-medium hover:underline"
>

        <ArrowLeft size={20} />
        Back
      </Link>

      {/* Background */}
      <div className="absolute w-[500px] h-[500px] bg-primary rounded-full blur-3xl opacity-30 top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-secondary rounded-full blur-3xl opacity-30 bottom-[-150px] right-[-150px]" />

      {/* Form Card */}
      <div className="relative z-10 bg-white w-full max-w-xl p-10 rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Smart GN Logo" className="w-16 h-16 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Citizen Registration
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Create your Smart GN account to access digital services.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
          />

          {/* NIC */}
          <input
            type="text"
            name="nic"
            required
            value={formData.nic}
            onChange={handleChange}
            placeholder="NIC Number"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="my-6 border-t"></div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Register;
