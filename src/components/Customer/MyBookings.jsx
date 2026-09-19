import React, { useEffect, useState } from "react";
import CustomerBookingTable from "./CustomerBookingTable";
import apiClient from "../../api/apiClient";

const MyBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const number = localStorage.getItem("number");

    if (number) {
      apiClient
        .get(`getUsers/userBookings?number=${encodeURIComponent(number)}`)
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setBookingData(response.data);
          } else {
            setBookingData([{ message: "No bookings found yet." }]);
          }
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setBookingData([{ message: "Error loading bookings." }]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setBookingData([{ message: "Please log in to view your bookings." }]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#5b2d0b] mb-6">My Bookings & Reservations</h1>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your bookings...</div>
        ) : (
          <CustomerBookingTable data={bookingData} />
        )}
      </div>
    </div>
  );
};

export default MyBookings;
