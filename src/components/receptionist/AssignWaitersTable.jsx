import { useEffect, useState } from "react";
import AssignWaiterRow from "./AssignWaiterRow";
import TableHeader from "../TableHeader";
import apiClient from "../../api/apiClient";

export default function AssignWaitersTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiClient
      .get("allTableBookings/today")
      .then((response) => {
        setData(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching today's bookings for waiter assignment:", error);
      });
  }, []);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-[#e5e5e5] p-6 shadow-md">
      <TableHeader title="Assign Waiters (Today's Bookings)" />

      {/* Table List */}
      <div className="mt-4 flex flex-col gap-3">
        {data.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No table bookings scheduled for today.</p>
        ) : (
          data.map((table) => (
            <AssignWaiterRow key={table._id} data={table} />
          ))
        )}
      </div>
    </div>
  );
}