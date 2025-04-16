import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScheduleClassData } from '@/redux/Action/scheduleClassAction.js';
import { resetScheduleState } from '@/redux/Slice/scheduleSlice';


const Schedule = () => {
  const dispatch = useDispatch();
  const { scheduleClassData, isLoading, error, isScheduled } = useSelector(
    (state) => state.scheduleClass
  );

  useEffect(() => {
    dispatch(fetchScheduleClassData());
    return () => dispatch(resetScheduleState());
  }, [dispatch, isScheduled]); 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-blue-500 font-semibold">Loading schedule...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="bg-grey-100 border border-grey-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
          
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!scheduleClassData || scheduleClassData.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center p-8">
        <img
          src="/no-data.svg"
          alt="No classes"
          className="w-40 h-40 mb-4"
        />
        <span className="text-gray-500 font-medium">No classes scheduled yet.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {scheduleClassData.map((item) => (
        <Card
          key={item?._id}
          className="p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg lg:m-10"
        >
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">{item?.title}</h2>
            <p className="text-sm text-gray-600">
              <strong>Course Name:</strong> {item?.courseId?.title}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Instructor Name:</strong> {item?.instructorId?.userName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Meeting Link: </strong>
              <a
                href={item?.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700 transition duration-200"
              >
                {item?.meetingLink}
              </a>
            </p>
            <span className="text-xs text-gray-500">
              <b>Scheduled Time:</b> {new Date(item?.scheduleTime).toLocaleString()}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Schedule;