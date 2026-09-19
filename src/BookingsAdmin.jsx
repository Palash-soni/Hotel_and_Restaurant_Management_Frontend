import { useEffect, useState } from "react";
import BookingsHeader from "./components/bookings/BookingsHeader";
import BookingTabs from "./components/bookings/BookingTabs";
import BookingsTable from "./components/bookings/BookingsTable";
import apiClient from "./api/apiClient";

export default function BookingsAdmin() {
  const [active, setActive] = useState("room");
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    if (active === "room") {
      apiClient
        .get("roomBooking/")
        .then((response) => {
          setBookingData(Array.isArray(response.data) ? response.data : []);
        })
        .catch((err) => console.error("Error fetching room bookings:", err));
    } else {
      apiClient
        .get("allTableBookings/")
        .then((response) => {
          setBookingData(Array.isArray(response.data) ? response.data : []);
        })
        .catch((err) => console.error("Error fetching table bookings:", err));
    }
  }, [active]);

  return (
    <main className="w-full px-8 py-6 lg:px-12">
      <BookingsHeader />

      <BookingTabs active={active} onChange={setActive} />

      {active === "room" && (
        <BookingsTable
          title="Room Bookings"
          headers={[
            "Room ID",
            "U. Name",
            "Room Type",
            "Check In",
            "Check Out",
            "Total Amount",
            "Booking Status",
            "Booking Date",
            "Action",
          ]}
          data={bookingData}
        />
      )}

      {active === "table" && (
        <BookingsTable
          title="Table Bookings"
          headers={[
            "Table ID",
            "U. Name",
            "Date",
            "Time Slot",
            "Status",
            "Booking Date",
            "Action",
          ]}
          data={bookingData}
        />
      )}
    </main>
  );
}