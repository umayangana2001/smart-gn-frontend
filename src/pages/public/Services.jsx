import { FileText, Users, ShieldCheck, BarChart } from "lucide-react";

export default function Services() {
  return (
    <div>

      {/* 🌿 HERO SECTION */}
      <div
  className="relative py-20 text-white text-center"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1578517929167-db9ed31cd5c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center"
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
            icon={<FileText size={40} />}
            title="Residence Certificate"
            description="Apply online for residence verification certificate."
          />
          <ServiceCard
            icon={<Users size={40} />}
            title="Income Certificate"
            description="Request official income verification document."
          />
          <ServiceCard
            icon={<ShieldCheck size={40} />}
            title="Character Certificate"
            description="Apply for character verification securely."
          />
        </div>
      </div>

      {/* 🌿 OFFICER SERVICES */}
      <div className="bg-gray-100 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
          GN Officer Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<FileText size={40} />}
            title="Approve Requests"
            description="Review and approve citizen requests."
          />
          <ServiceCard
            icon={<Users size={40} />}
            title="Manage Records"
            description="Maintain and update division records."
          />
          <ServiceCard
            icon={<BarChart size={40} />}
            title="Generate Reports"
            description="View statistics and generate reports."
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
            icon={<ShieldCheck size={40} />}
            title="Role Control"
            description="Assign and manage user roles."
          />
          <ServiceCard
            icon={<BarChart size={40} />}
            title="System Monitoring"
            description="Track platform activity and logs."
          />
        </div>
      </div>

    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
      <div className="text-green-700 flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
