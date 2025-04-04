import React from "react";
import { Button } from "@/components/ui/button";
import { getFilteredMenuItems } from "@/utils/constants.js";

const Sidebar = ({ activeTab, setActiveTab, handleLogout, role }) => {
  const filteredMenuItems = getFilteredMenuItems(role); 

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          {role === "admin"
            ? "Admin View"
            : role === "instructor"
            ? "Instructor View"
            : "Student View"}
        </h2>
        <nav>
          {filteredMenuItems.map((item) => (
            <Button
              className="w-full bg-gray-50 justify-start mb-2"
              key={item.value}
              variant={activeTab === item.value ? "secondary" : "ghost"}
              onClick={item.value === "logout" ? handleLogout : () => setActiveTab(item.value)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
