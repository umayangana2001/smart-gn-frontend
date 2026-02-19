import {
  FileText,
  Users,
  ShieldCheck,
  ClipboardList,
  CalendarCheck,
  MessageSquareWarning,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div>
      {/* 🌿 HERO SECTION */}
      <div
        className="relative py-20 text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1578517929167-db9ed31cd5c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/40 to-primary/30"></div>

        <div className="relative">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p>Digital public services provided through Smart GN System</p>
        </div>
      </div>

      {/* 🌿 CITIZEN SERVICES */}
      <div className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
          Citizen Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<ClipboardList size={40} />}
            title="Request Services"
            description="Submit and track your service requests easily."
            onClick={() => navigate("/citizen/services")}
          />

          <ServiceCard
            icon={<CalendarCheck size={40} />}
            title="Set Appointment"
            description="Schedule an appointment with your GN officer."
            onClick={() => navigate("/citizen/appointments")}
          />

          <ServiceCard
            icon={<MessageSquareWarning size={40} />}
            title="Complaints"
            description="Submit and monitor your complaints online."
            onClick={() => navigate("/citizen/complaints")}
          />
        </div>
      </div>

      {/* 🌿 GN OFFICER SERVICES */}
      <div className="bg-gray-100 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
          GN Officer Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<FileText size={40} />}
            title="Approve Requests"
            description="Review and approve citizen service requests."
          />

          <ServiceCard
            icon={<Users size={40} />}
            title="Manage Records"
            description="Maintain and update division records."
          />

          <ServiceCard
            icon={<CalendarCheck size={40} />}
            title="Handle Appointments"
            description="View and manage citizen appointment bookings."
          />
        </div>
      </div>

      {/* 🌿 ADMIN SERVICES */}
      <div className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
          Admin Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Users size={40} />}
            title="User Management"
            description="Manage citizens and GN officers."
          />

          <ServiceCard
            icon={<MessageSquareWarning size={40} />}
            title="Handle Complaints"
            description="Monitor and resolve citizen complaints."
          />

          <ServiceCard
            icon={<ShieldCheck size={40} />}
            title="Role Control"
            description="Assign and manage user roles and permissions."
          />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
    >
      <div className="text-green-700 flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
