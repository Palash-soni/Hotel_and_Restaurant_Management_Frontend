import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ChartCard from "./components/ChartCard";
import StatCard from "./components/StatCard";
import AvailabilityCard from "./components/AvailabilityCard";
import { useEffect, useState } from "react";
import { getDashboardData } from "./api/dashboardApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const data = await getDashboardData();
    setDashboard(data);
  };

  const barData = [
    { name: "Rooms", value: dashboard?.roomsMonth },
    { name: "Tables", value: dashboard?.tablesMonth },
    { name: "Users", value: dashboard?.newUsers },
  ];

  return (
    // <div className="flex bg-[#f3f3f3] min-h-screen">
    //   <Sidebar />

    <main className="flex-1 p-6 md:p-10">
      <Topbar />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* <ChartCard className="lg:col-span-2 h-full flex items-center justify-center text-gray-400">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboard?.last7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#7c1d1d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard> */}

<ChartCard className="lg:col-span-2 h-full flex flex-col items-center justify-center">
  <ResponsiveContainer className=" pr-5 pt-5" width="100%" height={200}>
  <LineChart data={dashboard?.revenueChart}>
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="day" />

    <YAxis />

    <Tooltip formatter={(value) => `₹ ${value}`} />

    <Line
      type="monotone"
      dataKey="revenue"
      stroke="#7c1d1d"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>
<p className="text-center text-[#5b0f0f] font-medium text-lg">
            Revenue
          </p>
</ChartCard>





        <ChartCard className="h-72 flex flex-col justify-evenly">
          <div className="flex items-center justify-center text-gray-400 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#7c1d1d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[#5b0f0f] font-medium">
            Growth This Month
          </p>
        </ChartCard>
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-[#e9e9e9] rounded-3xl p-10 flex flex-col md:flex-row justify-around items-center">
          <div className="text-center">
            <h3 className="text-6xl font-bold text-[#5b0f0f]">{dashboard?.roomsToday}</h3>
            <p className="mt-4 text-xl text-[#5b0f0f]">Rooms Booked Today</p>
          </div>

          <div className="hidden md:block w-px h-32 bg-[#5b0f0f]" />

          <div className="text-center mt-8 md:mt-0">
            <h3 className="text-6xl font-bold text-[#5b0f0f]">{dashboard?.tablesToday}</h3>
            <p className="mt-4 text-xl text-[#5b0f0f]">Tables Booked Today</p>
          </div>
        </div>

        <div className="space-y-6">
          <AvailabilityCard number={dashboard?.totalRooms} label="Total Rooms"  />
          <AvailabilityCard number={dashboard?.totalTables} label="Total Tables" />
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <StatCard number="250" label="Total Rooms Booked This Month" data={dashboard?.roomsMonth} />
        <StatCard number="250" label="Total Tables Booked This Month" data={dashboard?.tablesMonth} />
        <StatCard number="250" label="New Users Login This Month" data={dashboard?.newUsers} />
      </div>
    </main>
    // </div>
  );
}
