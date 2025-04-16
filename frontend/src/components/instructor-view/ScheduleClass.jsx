import { setLiveClassData } from "@/redux/Slice/scheduleSlice.js"; 
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import CommonForm from "../common/CommonForm";
import {  liveClassFormControl } from "../../config/customForms";
import { useDispatch, useSelector } from "react-redux";
import { useCourseContext } from "@/context/CourseContext";
import { useBatchContext } from "@/context/BatchContext";
import { scheduleLiveClassAction } from "@/redux/Action/scheduleClassAction.js";
import { fetchNotificationCount, sendNotification } from "@/redux/Action/notificationActions.js";
import { liveClassSchema } from "@/services/schemasZod";
import { useEffect } from "react";

const ScheduleClass = () => {
  const dispatch = useDispatch();
  const { courses } = useCourseContext();
  const { batch } = useBatchContext();
  const { liveClassData, isScheduled } = useSelector((state) => state.scheduleClass);
console.log(liveClassData, "liveClassData");

  useEffect(() => {
    if (isScheduled) {
      dispatch(fetchNotificationCount());
    }
  }, [isScheduled, dispatch]);

  const handleScheduleClass = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(scheduleLiveClassAction(liveClassData));
      console.log(result, "result");
      console.log( result.payload?.liveClassId, "result.payload?.liveClassId");
      
      
      if (result.payload?.liveClassId) {
        dispatch(sendNotification({
          message: `New Live Class: ${liveClassData.title}`,
          liveClassId: result.payload.liveClassId
        }));
      }
    } catch (error) {
      console.error("Scheduling failed:", error);
    }
  };

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Schedule New Live Class</CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={liveClassFormControl(courses, batch)}
          formData={liveClassData}
          setFormData={(data) => dispatch(setLiveClassData(data))}
          buttonText="Schedule Class"
          handleSubmit={handleScheduleClass}
          validationSchema={liveClassSchema}
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleClass;