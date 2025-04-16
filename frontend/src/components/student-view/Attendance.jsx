
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
// import { useBatchContext } from "@/context/BatchContext";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";

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
        console.log("res", res.data);
        
        setWeeklyData(res.data.data|| []);
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
  console.log( "wwwwwww",weeklyData);
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

  const totalPresent = Array.isArray(weeklyData) ? weeklyData.reduce((sum, w) => sum + w.present, 0) : 0;
  const totalAbsent = weeklyData.reduce((sum, w) => sum + w.absent, 0);
  const attendanceRate =
    totalPresent + totalAbsent > 0
      ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
      : 0;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Your Weekly Attendance
            </h1>

            <div className="relative h-64 md:h-80">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-emerald-50 p-4">
                <h3 className="text-sm font-medium text-emerald-800">
                  Total Present
                </h3>
                <p className="text-2xl font-bold text-emerald-600">
                  {totalPresent}
                </p>
              </Card>
              <Card className="bg-red-50 p-4">
                <h3 className="text-sm font-medium text-red-800">
                  Total Absent
                </h3>
                <p className="text-2xl font-bold text-red-600">
                  {totalAbsent}
                </p>
              </Card>
              <Card className="bg-blue-50 p-4">
                <h3 className="text-sm font-medium text-blue-800">
                  Attendance Rate
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {attendanceRate}%
                </p>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
