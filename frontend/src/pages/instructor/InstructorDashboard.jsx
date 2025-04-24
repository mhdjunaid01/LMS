import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavTabs from "@/components/admin-view/Tabs";
import MobileNavbar from "@/components/admin-view/MobileNavbar";
import Sidebar from "@/components/admin-view/SideBar";
import { AuthContext } from "@/context/AuthContext";

const InstructorDashboard = () => {
  const { removeToken, userRole } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab });
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row h-full min-h-screen bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MobileNavbar
          activeTab={tab}
          setActiveTab={handleTabChange}
          handlLogout={removeToken}
          role={userRole}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Sidebar
          activeTab={tab}
          setActiveTab={handleTabChange}
          handleLogout={removeToken}
          role={userRole}
        />
      </motion.div>
      <motion.main
        className="flex-1 p-4 md:p-8 overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <NavTabs
          activeTab={tab}
          setActiveTab={handleTabChange}
          role={userRole}
        />
      </motion.main>
    </motion.div>
  );
};

export default InstructorDashboard;
