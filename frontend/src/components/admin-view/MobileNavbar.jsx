import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { getFilteredMenuItems } from "@/utils/constants.js";

const MobileNavbar = ({ activeTab, setActiveTab, handleLogout, role }) => {
  const filteredMenuItems = getFilteredMenuItems(role);

  return (
    <div className="md:hidden">
      <input type="checkbox" id="menu-toggle" className="hidden peer" />

      {/* Mobile Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{role === "admin" ? "Admin View" : "Instructor View"}</h2>
        <label htmlFor="menu-toggle" className="cursor-pointer p-2 rounded hover:bg-gray-100">
          <Menu className="h-6 w-6 peer-checked:hidden" />
          <X className="h-6 w-6 hidden peer-checked:block" />
        </label>
      </div>

      {/* Mobile Menu */}
      <div className="hidden peer-checked:block bg-white shadow-md z-10">
        <nav className="p-4">
          {filteredMenuItems.map((item) => (
            <Button
              className="w-full bg-gray-50 justify-start mb-2"
              key={item.value}
              variant={activeTab === item.value ? "secondary" : "ghost"}
              onClick={() => {
                if (item.value === "logout") {
                  handleLogout();
                } else {
                  setActiveTab(item.value);
                  document.getElementById("menu-toggle").checked = false;
                }
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
