import React, { useState, useEffect } from 'react';

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
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      {students.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        <ul className="space-y-4">
          {students.map((student) => (
            <li key={student.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-lg">{student.userName}</span>

              <div className="space-x-4">
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    value="present"
                    onChange={() => handleAttendanceChange(student.id, 'present')}
                    checked={attendanceData[student.id] === 'present'}
                  />
                  <span>Present</span>
                </label>

                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    value="absent"
                    onChange={() => handleAttendanceChange(student.id, 'absent')}
                    checked={attendanceData[student.id] === 'absent'}
                  />
                  <span>Absent</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}

      {students.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={!isAllMarked}
          className={`mt-4 px-4 py-2 ${isAllMarked ? 'bg-blue-500 text-white rounded-lg hover:bg-blue-600' : 'bg-gray-500 text-white rounded-lg'}`}
        >
          {isAllMarked ? 'Submit Attendance' : 'Please mark attendance for all students'}
        </button>
      )}
    </div>
  );
};

export default StudentList;