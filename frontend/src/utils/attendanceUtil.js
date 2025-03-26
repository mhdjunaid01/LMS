export const checkAttendanceFormIsValid =(attendanceFormData)=>{
    return (
        attendanceFormData &&
        attendanceFormData.batch !== "" &&
        attendanceFormData.title !== "" &&
        attendanceFormData.date !== "" 
      );
}