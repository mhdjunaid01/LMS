import { useContext, useState } from "react";
import NavTabs from "@/components/admin-view/Tabs";
import MobileNavbar from "@/components/admin-view/MobileNavbar";
import Sidebar from "@/components/admin-view/SideBar";
import { AuthContext } from "@/context/AuthContext";

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { removeToken, userRole } = useContext(AuthContext); // Get role from context

  const handleLogout = () => removeToken();

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-100">
      <MobileNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handlLogout={handleLogout}
        role={userRole} // Pass role to MobileNavbar
      />
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        role={userRole} // Pass role to Sidebar
      />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} role={userRole} />
      </main>
    </div>
  );
};

export default InstructorDashboard;
