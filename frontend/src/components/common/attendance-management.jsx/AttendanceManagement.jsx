import { useBatchContext } from '@/context/BatchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CommenForm from '../CommonForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { attendanceForm, InitialAttendanceFormData } from '@/config/customForms';
import { checkAttendanceFormIsValid } from '@/utils/attendanceUtil';
import { getStudents, setIsLoading, setError } from '@/redux/attendanceSlice/attendanceSlice';
import StudentList from './StudentList';

const AttendanceManagement = () => {
  const [attendanceFormData, setAttendanceFormData] = useState(InitialAttendanceFormData);
  const { courses, batch } = useBatchContext();
  const dispatch = useDispatch();
  const { students, isLoading, error } = useSelector((state) => state.attendanceData);

  const handleFetchStudents = useCallback(async (e) => {
    if (e) e.preventDefault();

    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get('/attendance/getStudentsForAttendance', { params: attendanceFormData });
      dispatch(getStudents(response.data.students));
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error fetching students:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [attendanceFormData, dispatch]);

  useEffect(() => {
    if (attendanceFormData.courseId && attendanceFormData.batchId) {
      handleFetchStudents();
    }
  }, [attendanceFormData, handleFetchStudents]);

  useEffect(() => {
    console.log('Courses:', courses);
    console.log('Batch:', batch);
  }, [courses, batch]);

  const formControls = attendanceForm(courses || [], batch || []);

  const renderContent = () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return null;
  };

  const handleAttendanceSubmit = useCallback(async (attendanceData) => {
    try {
      const { courseId, batchId, date } = attendanceFormData; // Get selected course, batch, and date

      if (!courseId || !batchId || !date) {
        alert("Please select course, batch, and date.");
        return;
      }

      const formattedData = Object.entries(attendanceData).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      const response = await axiosInstance.post("/attendance/submitAttendance", {
        courseId,
        batchId,
        date,
        records: formattedData,
      });

      if (response.data.success) {
        alert("Attendance submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  }, [attendanceFormData]);

  return (
    <Card className="p-6 space-y-4">
      <CardHeader>
        <CardTitle>Select Course and Batch to view Attendance</CardTitle>
        <CardDescription>Attendance Management</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CommenForm
          formControls={formControls}
          buttonText={"Submit"}
          formData={attendanceFormData}
          setFormData={setAttendanceFormData}
          isButtonDisabled={!checkAttendanceFormIsValid(attendanceFormData)}
        />
        {renderContent() || (students.length > 0 && (
          <StudentList students={students} handleAttendanceSubmit={handleAttendanceSubmit} />
        ))}
      </CardContent>
    </Card>
  );
};

export default AttendanceManagement;