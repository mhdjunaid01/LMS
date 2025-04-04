import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ManagementTable from "@/components/dynamicTable/ManagementTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyCourses = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.user) return <p>Loading user details...</p>;

  const user = auth.user;
  
  const columns = ["Course Name", "Instructor", "Progress", "Status"];
  const columnMapping = {
    "Course Name": "courseName",
    "Instructor": "instructor",
    "Progress": "progress",
    "Status": "status",
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <ManagementTable
            title="Enrolled Courses"
            columns={columns}
            data={user.courses}
            columnMapping={columnMapping}
            onSave={(updatedData) => console.log("Updated Course Data:", updatedData)}
            hideDelete={true} 
            hideEdit={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCourses;
