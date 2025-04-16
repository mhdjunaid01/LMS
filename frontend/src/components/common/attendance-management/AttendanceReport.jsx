import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CommonForm from "../CommonForm";
import AttendanceReportTable from "./AttendanceReportTable";
import { useState, useEffect } from "react";
import { useBatchContext } from "@/context/BatchContext";
import { attendanceReportFormControls, InitialAttendanceReportFormControls } from "@/config/customForms";
import { fetchAttendanceReport } from "@/redux/Action/attandanceActions";
const AttendanceReport = () => {
  const [attendanceReportFormData, setAttendanceReportFormData] = useState(InitialAttendanceReportFormControls);
  const { courses, batch } = useBatchContext();
  const [courseId, setCourseId] = useState("");
  const [batchId, setBatchId] = useState("");

  const formControls = attendanceReportFormControls(courses, batch);

  // Update selected course and batch from form data on change
  useEffect(() => {
    if (attendanceReportFormData.courseId && attendanceReportFormData.batchId) {
      setCourseId(attendanceReportFormData.courseId);
      setBatchId(attendanceReportFormData.batchId);
    }
  }, [attendanceReportFormData]);

  const handleSubmit = (e,courseId,batchId) => {
    e.preventDefault();
    fetchAttendanceReport(courseId, batchId); // Fetch attendance report based on selected course and batch
    // Basic validation (optional)
    if (!attendanceReportFormData.courseId || !attendanceReportFormData.batchId) {
      alert("Please select both Course and Batch to view the report.");
      return;
    }
  
    // These setters will trigger the AttendanceReportTable render
    setCourseId(attendanceReportFormData.courseId);
    setBatchId(attendanceReportFormData.batchId);
  }
  return (
  <>
    <Card className="p-6 space-y-4">
      <CardHeader>
        <CardTitle>Select Course and Batch to view Attendance Report</CardTitle>
        <CardDescription>Attendance Report</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CommonForm
          formControls={formControls}
          buttonText={"Submit"}
          formData={attendanceReportFormData}
          setFormData={setAttendanceReportFormData}
          onSubmit={handleSubmit}
          
          
        />
      </CardContent>
    </Card>
      {<AttendanceReportTable courseId={courseId} batchId={batchId} />}
      </>
  );
};

export default AttendanceReport;
