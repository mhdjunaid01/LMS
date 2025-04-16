import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ManagementTable from "@/components/dynamicTable/managementTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.user) return <p>Loading user details...</p>;

  const user = auth.user;

  const studentFields = ["userName", "email"];

  const columnMapping = studentFields.reduce(
    (acc, field) => ({ ...acc, [field]: field }),
    {}
  );

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        
        <CardContent>
          <ManagementTable
            title="Profile Details"
            columns={studentFields}
            data={[user]}
            columnMapping={columnMapping}
            onSave={(updatedData) => console.log("Updated Data:", updatedData)}
            hideDelete={true}
            hideEdit={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
