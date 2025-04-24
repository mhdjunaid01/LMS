import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { motion } from "framer-motion";

const Attendance = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { auth } = useContext(AuthContext);

  const studentId = auth.user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/attendance/studentWeekly/${studentId}`
        );
        setWeeklyData(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading attendance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const totalPresent = Array.isArray(weeklyData)
    ? weeklyData.reduce((sum, w) => sum + w.present, 0)
    : 0;
  const totalAbsent = weeklyData.reduce((sum, w) => sum + w.absent, 0);
  const attendanceRate =
    totalPresent + totalAbsent > 0
      ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
      : 0;

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6 space-y-6">
            <motion.h1
              className="text-2xl font-bold text-gray-800"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Your Weekly Attendance
            </motion.h1>

            <motion.div
              className="relative h-64 md:h-80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis allowDecimals={false} stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderColor: "#e5e7eb",
                      borderWidth: 1,
                    }}
                    cursor={{ fill: "#f9fafb" }}
                  />
                  <Legend verticalAlign="top" />
                  <Bar
                    dataKey="present"
                    name="Present"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="absent"
                    name="Absent"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              <motion.div
                className="bg-emerald-50 p-4"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <h3 className="text-sm font-medium text-emerald-800">
                  Total Present
                </h3>
                <p className="text-2xl font-bold text-emerald-600">
                  {totalPresent}
                </p>
              </motion.div>
              <motion.div
                className="bg-red-50 p-4"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <h3 className="text-sm font-medium text-red-800">
                  Total Absent
                </h3>
                <p className="text-2xl font-bold text-red-600">
                  {totalAbsent}
                </p>
              </motion.div>
              <motion.div
                className="bg-blue-50 p-4"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <h3 className="text-sm font-medium text-blue-800">
                  Attendance Rate
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {attendanceRate}%
                </p>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Attendance;
