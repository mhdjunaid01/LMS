import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceReport } from "@/redux/Action/attandanceActions";
import ManagementTable from "@/components/dynamicTable/managementTable";

const AttendanceReportTable = ({ courseId, batchId }) => {
  const dispatch = useDispatch();

  const attendanceReport = useSelector((state) => state.attendanceData.attendanceReport);
console.log("Attendance ffffffffffff:", attendanceReport);
  const isLoading = useSelector((state) => state.attendanceData.isLoading);
const error = useSelector((state) => state.attendanceData.error);
console.log("Attendance error:", error);
  const columns =["StudentName", "present/Total", "Attendance %", "Eligibility for interviews"]


  const columnMapping = useMemo(
    () => ({
      "StudentName": "studentName",
      "present/Total": "presentTotal",
      "Attendance %": "attendancePercentage",
      "Eligibility for interviews": "eligibilityForInterviews",
    }),
    []
  );

  useEffect(() => {
    if (courseId && batchId) {
      dispatch(fetchAttendanceReport(courseId, batchId));
    }
  }, [courseId, batchId, dispatch]);

  const mappedData = useMemo(
    () =>
      attendanceReport.map((item) => ({
        studentName: item.studentName,
        presentTotal: `${item.presentDays}/${item.totalClasses}`,
        attendancePercentage: `${item.attendancePercentage}%`,
        eligibilityForInterviews: item.isEligibleForPlacement ? " Eligible" : " Not Eligible",
      })),
    [attendanceReport]
  );

  if (isLoading) return <p className="text-center">Loading Attendance Report...</p>;
  if (!isLoading && attendanceReport.length === 0) return <p className="text-center">No attendance data available.</p>;
  if (!attendanceReport) return <p className="text-center">No attendance data available.</p>;
  return (
    <ManagementTable
      title="Attendance Report"
      columns={columns}
      data={mappedData}
      columnMapping={columnMapping}
      onDelete={null}
      onSave={null}
      loading={isLoading}
      hideDelete={true}
      hideEdit={true}
    />
  );
};

export default AttendanceReportTable;
