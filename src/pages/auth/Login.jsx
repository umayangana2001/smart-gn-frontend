import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { loginUser } from "../../services/authService";
import { toast } from "react-hot-toast"; // ✅ import toast
import logo from "../../assets/logo/smart-gn-logo.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      // Save token & user
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Welcome back, ${data.user.fullName || data.user.role}!`); // ✅ success toast

      const role = data.user.role;

      if (role === "SUPER_ADMIN" || role === "ADMIN") navigate("/admin");
      else if (role === "VILLAGE_OFFICER") navigate("/village-officer");
      else if (role === "USER") navigate("/citizen");
      else navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password"); // ✅ error toast
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
      <Link to="/home" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-primary font-medium hover:underline">
        <ArrowLeft size={20} /> Back
      </Link>

      {/* Blobs */}
      <div className="absolute w-[600px] h-[600px] bg-primary rounded-full blur-2xl opacity-30 animate-blob top-[-250px] right-[-250px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-primary rounded-full blur-2xl opacity-30 animate-blob animation-delay-2000 bottom-[-250px] left-[-250px]"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Smart GN Logo" className="w-16 h-16 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-center text-primary mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-8">Login to access Smart GN digital services.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="Enter your password"
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

          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition">
            Login
          </button>
        </form>

        <div className="my-6 border-t"></div>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;
