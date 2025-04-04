import React, { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { useScheduleContext } from "@/context/ScheduleContext";

const Schedule = () => {
  const {
    schedule,
    loading,
    error,
  } = useScheduleContext();


  return (
    <div className="space-y-4">
      {schedule?.length > 0 ? (
        schedule.map((item) => (
          <Card key={item?._id} className="p-6">
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">{item?.title}</h2>
              <p className="text-sm text-gray-700">
                <strong>Course Name:</strong> {item?.courseId?.title}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Instructor Name:</strong> {item?.instructorId?.userName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Meeting Link: </strong>
                <a
                  href={item?.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {item?.meetingLink}
                </a>
              </p>
              <span className="text-xs text-gray-500">
                Scheduled Time:{" "}
                {new Date(item?.scheduleTime).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">You have no classes scheduled.</p>
        </div>
      )}

      {loading && <p className="text-gray-500">Loading schedule...</p>}
      {error && (
        <p className="text-red-500">Error fetching schedule: {error.message}</p>
      )}
    </div>
  );
};

export default Schedule;
