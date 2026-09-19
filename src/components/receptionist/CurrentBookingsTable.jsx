import { useEffect, useState } from "react";
import TableHeader from "../TableHeader";
import TableRow from "./TableRow";
import apiClient from "../../api/apiClient";

export default function CurrentBookingsTable() {
  const [currBookings, setCurrBookings] = useState([]);

  useEffect(() => {
    apiClient
      .get("allTableBookings/")
      .then((response) => {
        setCurrBookings(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching table bookings:", error);
      });
  }, []);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-[#e5e5e5] p-6">
      <TableHeader title="All Table Bookings" />

      {/* Table List */}
      <div className="mt-4 flex flex-col gap-3">
        {currBookings.map((booking) => (
          <TableRow key={booking._id} data={booking} />
        ))}
      </div>
    </div>
  );
}