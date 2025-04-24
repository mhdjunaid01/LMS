// StudentList Component
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const StudentList = ({ students, handleAttendanceSubmit }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [isAllMarked, setIsAllMarked] = useState(false);

  useEffect(() => {
    if (students.length > 0) {
      const unmarkedStudents = students.filter(student => !attendanceData[student.id]);
      setIsAllMarked(unmarkedStudents.length === 0);
    }
  }, [attendanceData, students]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    if (students.length === 0) {
      toast.error("No students available.");
      return;
    }

    if (!isAllMarked) {
      toast.warning("Please mark attendance for all students.");
      return;
    }

    handleAttendanceSubmit(attendanceData); // send data to parent
    setAttendanceData({}); // reset attendance selections
    toast.success("Attendance submitted successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border rounded-lg">
        <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
          <CardTitle className="text-xl font-semibold text-gray-800">Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {students.length === 0 ? (
            <p className="text-muted-foreground text-center text-lg">No students found.</p>
          ) : (
            <>
              <div className="space-y-6">
                {students.map((student) => (
                  <div 
                    key={student.id} 
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <span className="text-lg font-medium text-gray-700">{student.userName}</span>

                    <div className="space-x-4 flex items-center">
                      <Button
                        variant={attendanceData[student.id] === 'present' ? 'default' : 'outline'}
                        onClick={() => handleAttendanceChange(student.id, 'present')}
                        className={`${
                          attendanceData[student.id] === 'present' ? 'bg-green-500 text-white' : 'text-gray-600'
                        }`}
                      >
                        Present
                      </Button>

                      <Button
                        variant={attendanceData[student.id] === 'absent' ? 'default' : 'outline'}
                        onClick={() => handleAttendanceChange(student.id, 'absent')}
                        className={`${
                          attendanceData[student.id] === 'absent' ? 'bg-red-500 text-white' : 'text-gray-600'
                        }`}
                      >
                        Absent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {students.length > 0 && (
                <Button
                  onClick={handleSubmit}
                  disabled={!isAllMarked}
                  className={`w-full mt-6 py-3 text-lg font-semibold ${
                    isAllMarked ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isAllMarked ? 'Submit Attendance' : 'Please mark attendance for all students'}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentList;
