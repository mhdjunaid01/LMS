import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
      alert("No students available.");
      return;
    }

    if (!isAllMarked) {
      alert("Please mark attendance for all students.");
      return;
    }

    handleAttendanceSubmit(attendanceData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p className="text-muted-foreground text-center">No students found.</p>
        ) : (
          <>
            <div className="space-y-4">
              {students.map((student) => (
                <div 
                  key={student.id} 
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-lg font-medium">{student.userName}</span>

                  <div className="space-x-4 flex items-center">
                    <Label 
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        value="present"
                        onChange={() => handleAttendanceChange(student.id, 'present')}
                        checked={attendanceData[student.id] === 'present'}
                        className="form-radio"
                      />
                      <span>Present</span>
                    </Label>

                    <Label 
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        value="absent"
                        onChange={() => handleAttendanceChange(student.id, 'absent')}
                        checked={attendanceData[student.id] === 'absent'}
                        className="form-radio"
                      />
                      <span>Absent</span>
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            {students.length > 0 && (
              <Button
                onClick={handleSubmit}
                disabled={!isAllMarked}
                className="w-full mt-4"
                variant={isAllMarked ? 'default' : 'secondary'}
              >
                {isAllMarked ? 'Submit Attendance' : 'Please mark attendance for all students'}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentList;