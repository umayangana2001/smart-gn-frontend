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
import UserDashboardfrom './user/UserDashboard';

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

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Village Officer Dashboard */}
        <Route path="/village-officer" element={<VODashboard />} />
        
         {/* Citizen Dashboard */}
        <Route path="/citizen" element={<Userdash />} />

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
