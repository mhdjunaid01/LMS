import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { getFilteredMenuItems } from "@/utils/constants.js";

const NavTabs = ({ activeTab, setActiveTab, role }) => {
  const filteredMenuItems = getFilteredMenuItems(role);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {filteredMenuItems.map((menuItem) => (
          <TabsContent key={menuItem.value} value={menuItem.value}>
            {menuItem.component ? React.createElement(menuItem.component) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default NavTabs;
