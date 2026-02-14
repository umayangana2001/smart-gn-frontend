import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo/smart-gn-logo.png";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Citizen Registered:", formData);

    navigate("/login");
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
  className="absolute top-6 left-6 flex items-center gap-2 text-primary font-medium hover:underline"
>
  <ArrowLeft size={20} />
  Back
</Link>

      {/* Animated Background Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-primary rounded-full 
                blur-3xl opacity-30 animate-blob 
                top-[-150px] left-[-150px]"></div>

      <div className="absolute w-[500px] h-[500px] bg-secondary rounded-full 
                blur-3xl opacity-30 animate-blob animation-delay-2000 
                bottom-[-150px] right-[-150px]"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-white w-full max-w-xl p-10 rounded-2xl shadow-2xl border border-gray-100">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Smart GN Logo" className="w-16 h-16 rounded-full" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Citizen Registration
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Create your Smart GN account to access digital services.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         focus:border-primary transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* NIC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIC Number
            </label>
            <input
              type="text"
              name="nic"
              required
              value={formData.nic}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         focus:border-primary transition"
              placeholder="Enter your NIC number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         focus:border-primary transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         focus:border-primary transition"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12
                           focus:outline-none focus:ring-2 focus:ring-primary 
                           focus:border-primary transition"
                placeholder="Create a password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12
                           focus:outline-none focus:ring-2 focus:ring-primary 
                           focus:border-primary transition"
                placeholder="Confirm your password"
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
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg 
                       font-semibold hover:bg-secondary transition"
          >
            Register
          </button>

        </form>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Login Link */}
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
