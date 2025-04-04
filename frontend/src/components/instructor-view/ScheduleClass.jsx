import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CommonForm from "../common/CommonForm";
import { initialLiveClassFormData, liveClassFormControl } from "../../config/customForms";
import { useInstructorContext } from "@/context/InstructorContext";
import { useNotificationContext } from "@/context/NotificationContext";
import { liveClassSchema } from "../../services/schemasZod.js";
import { useCourseContext } from "@/context/CourseContext";
import { useBatchContext } from "@/context/BatchContext";

const ScheduleClass = () => {
  const { courses } = useCourseContext();
  const { batch } = useBatchContext();
  const [liveClassData, setLiveClassData] = useState({initialLiveClassFormData});
  const { scheduleLiveClass } = useInstructorContext();
  const { sendNotification } = useNotificationContext();
  const { setUpdateTrigger } = useScheduleContext(); 

  const handleScheduleClass = async (e) => {
    e.preventDefault();
    try {
      const response = await scheduleLiveClass(liveClassData);
      if (response?.liveClassId) {
        sendNotification({
          message: `New Live Class Scheduled: ${liveClassData.title}`,
          liveClassId: response.liveClassId,
        });
      }
      setUpdateTrigger((prev) => !prev); 
    } catch (error) {
      console.error("Error scheduling class:", error);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Schedule a Live Class</CardTitle>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={liveClassFormControl(courses, batch)}
            formData={liveClassData}
            setFormData={setLiveClassData}
            buttonText="Schedule Class"
            handleSubmit={handleScheduleClass}
            validationSchema={liveClassSchema}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleClass;
