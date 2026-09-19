import { useEffect, useState } from "react";
import TableHeader from "../TableHeader";
import RoomRow from "./RoomRow";
import apiClient from "../../api/apiClient";

export default function PreviousBookingsRoom() {
  const [prevBookings, setPrevBookings] = useState([]);

  useEffect(() => {
    apiClient
      .get("roomBooking?flag=prev")
      .then((response) => {
        setPrevBookings(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching previous room bookings:", error);
      });
  }, []);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-[#e5e5e5] p-6">
      <TableHeader title="Previous Room Bookings" />

      {/* Table List */}
      <div className="mt-4 flex flex-col gap-3">
        {prevBookings.map((booking) => (
          <RoomRow key={booking._id} data={booking} />
        ))}
      </div>
    </div>
  );
}