import { useContext, useState } from "react";
import { motion } from "framer-motion";
import NavTabs from "@/components/admin-view/Tabs";
import MobileNavbar from "@/components/admin-view/MobileNavbar";
import Sidebar from "@/components/admin-view/SideBar";
import { AuthContext } from "@/context/AuthContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { removeToken, userRole } = useContext(AuthContext); // Get role from context

  const handleLogout = () => removeToken();

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row h-full min-h-screen bg-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <MobileNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        role={userRole} // Pass role to MobileNavbar
      />
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        role={userRole} // Pass role to Sidebar
      />

      {/* Main Content */}
      <motion.main
        className="flex-1 p-4 md:p-8 overflow-y-auto"
        variants={containerVariants}
      >
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} role={userRole} />
      </motion.main>
    </motion.div>
  );
};

export default AdminDashboard;
