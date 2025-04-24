// AttendanceManagement Component
import { useBatchContext } from '@/context/BatchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CommenForm from '../CommonForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { attendanceForm, InitialAttendanceFormData } from '@/config/customForms';
import { checkAttendanceFormIsValid } from '@/utils/attendanceUtil';
import {
  getStudents,
  setIsLoading,
  setError,
  clearStudents,
} from '@/redux/Slice/attendanceSlice.js';
import StudentList from './StudentList';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const AttendanceManagement = () => {
  const [attendanceFormData, setAttendanceFormData] = useState(InitialAttendanceFormData);
  const { courses, batch } = useBatchContext();
  const dispatch = useDispatch();
  const { students, isLoading, error } = useSelector((state) => state.attendanceData);

  const handleFetchStudents = useCallback(async (e) => {
    if (e) e.preventDefault();

    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get('/attendance/getStudentsForAttendance', {
        params: attendanceFormData,
      });
      dispatch(getStudents(response.data.students));
    } catch (error) {
      dispatch(setError(error.message));
      toast.error("Error fetching students");
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [attendanceFormData, dispatch]);

  useEffect(() => {
    if (attendanceFormData.courseId && attendanceFormData.batchId) {
      handleFetchStudents();
    }
  }, [attendanceFormData, handleFetchStudents]);

  const formControls = attendanceForm(courses || [], batch || []);

  const renderContent = () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return null;
  };

  const handleAttendanceSubmit = useCallback(async (attendanceData) => {
    const { courseId, batchId, date } = attendanceFormData;

    if (!courseId || !batchId || !date) {
      toast.warning("Please select course, batch, and date.");
      return;
    }

    try {
      const formattedData = Object.entries(attendanceData).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      const response = await axiosInstance.post('/attendance/submitAttendance', {
        courseId,
        batchId,
        date,
        records: formattedData,
      });

      if (response.data.success) {
        toast.success("Attendance submitted successfully!");
        dispatch(clearStudents()); // Reset students list
        setAttendanceFormData(InitialAttendanceFormData); // Reset form
      } else {
        toast.error("Something went wrong while submitting.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to submit attendance.");
    }
  }, [attendanceFormData, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 space-y-4">
        <CardHeader>
          <CardTitle>Select Course and Batch to view Attendance</CardTitle>
          <CardDescription>Attendance Management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <CommenForm
            formControls={formControls}
            buttonText="Submit"
            formData={attendanceFormData}
            setFormData={setAttendanceFormData}
            isButtonDisabled="hide"
          />

          {renderContent() || (students.length > 0 && (
            <StudentList
              students={students}
              handleAttendanceSubmit={handleAttendanceSubmit}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AttendanceManagement;
