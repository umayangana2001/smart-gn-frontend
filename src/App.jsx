import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OpeningScreen from "./pages/public/OpeningScreen";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import AdminDashboard from "./admin/AdminDashboard";
import VODashboard from "./villageOfficer/VODashboard";
import UserDashboard from "./user/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Opening Screen */}
        <Route path="/" element={<OpeningScreen />} />

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Village Officer Dashboard (Protected) */}
        <Route
          path="/village-officer"
          element={
            <ProtectedRoute>
              <VODashboard />
            </ProtectedRoute>
          }
        />

        {/* Citizen Dashboard (Protected) */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
}

export default App;
