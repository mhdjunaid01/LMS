import React, { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { fetchNotifications, handleReadNotification } from "@/redux/Action/notificationActions.js";

const Notifications = () => {
  const dispatch = useDispatch();

  const { notifications, isLoading, error } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const memoizedNotifications = useMemo(() => {
    return Array.isArray(notifications||[])
      ? notifications.map((notification) => ({
          ...notification,
          formattedDate: new Date(notification.createdAt).toLocaleString(),
        }))
      : [];
  }, [notifications]);

  const handleRead = useCallback((id) => {
    dispatch(handleReadNotification(id));
  }, [dispatch]);

  return (
    <div className="space-y-4 mt-3">
      {isLoading && <p className="text-gray-500">Loading notifications...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {memoizedNotifications.length > 0 ? (
        memoizedNotifications.map((notification) => (
          <Card
            key={notification._id}
            className="p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg lg:m-10"
          >
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-700">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.formattedDate}</span>
              <Button
                variant="link"
                className="text-xs text-blue-600 hover:underline"
                onClick={() => handleRead(notification._id)}
              >
                Read
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        !isLoading && !error && (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold">No Notifications</h2>
            <p className="text-gray-500">You have no new notifications.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Notifications;
