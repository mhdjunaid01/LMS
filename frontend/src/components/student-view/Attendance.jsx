import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const weeklyAttendanceData = [
  { week: "Week 1", present: 4, absent: 1 },
  { week: "Week 2", present: 3, absent: 2 },
  { week: "Week 3", present: 5, absent: 0 },
  { week: "Week 4", present: 2, absent: 3 },
];

const chartConfig = {
  present: {
    label: "Present",
    color: "#10b981",
  },
  absent: {
    label: "Absent",
    color: "#ef4444",
  },
};

const Attendance = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart width={600} height={300} data={weeklyAttendanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" tickLine={false} tickMargin={10} axisLine={false} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="present" fill={chartConfig.present.color} radius={4} />
        <Bar dataKey="absent" fill={chartConfig.absent.color} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default Attendance