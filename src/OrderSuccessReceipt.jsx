import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessReceipt = () => {
  const location = useLocation();
  const [ID, setID] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const data = location.state || {};

  useEffect(() => {
    setID(data.roomID ? data.roomID : data.tableID || data.tableId || "Confirmed");
    setType(data.roomID ? "Room ID :" : "Table ID :");
  }, [data]);

  const handleBack = () => {
    const userRole = (localStorage.getItem("role") || "").toLowerCase();
    if (userRole === "customer") {
      navigate("/MyBookings");
      return;
    } else if (userRole === "receptionist") {
      navigate("/Receptionist/Home");
      return;
    } else if (userRole === "waiter") {
      navigate("/Waiter/Home");
      return;
    } else if (userRole === "admin") {
      navigate("/Admin/Dashboard");
      return;
    }
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <section
        className="
          bg-white
          w-full
          max-w-lg
          border border-gray-300
          rounded-2xl
          shadow-xl
          p-6 md:p-8
        "
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-3 text-3xl">
            ✓
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b1f05]">
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 text-sm mt-1">Receipt & Confirmation Details</p>
        </div>

        <div className="border-b border-gray-200 my-6"></div>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-semibold text-[#3b1f05]">Name :</span>
            <span>{data.userName || localStorage.getItem("name") || "Guest"}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-semibold text-[#3b1f05]">Contact :</span>
            <span>{data.number || localStorage.getItem("number") || "-"}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-semibold text-[#3b1f05]">
              {data.roomID ? "Check In Date" : "Booking Date"} :
            </span>
            <span>{data.roomID ? data.checkInDate : data.bookingDate || "-"}</span>
          </div>

          {data.roomID && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-semibold text-[#3b1f05]">Check Out Date :</span>
              <span>{data.checkOutDate || "-"}</span>
            </div>
          )}

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-semibold text-[#3b1f05]">{type}</span>
            <span className="font-bold">{ID}</span>
          </div>

          <div className="flex justify-between py-3 border-t-2 border-gray-300 text-base font-bold text-[#3b1f05]">
            <span>Total Bill Paid :</span>
            <span>₹ {data.amount || data.totalAmount || 500}</span>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleBack}
            className="
              flex items-center gap-2
              bg-[#3b1f05]
              text-white
              px-8 py-3
              rounded-full
              text-base
              font-semibold
              transition
              hover:bg-[#4a2707]
              cursor-pointer
              shadow-md
            "
          >
            <span>←</span> Back to Dashboard / Home
          </button>
        </div>
      </section>
    </main>
  );
};

export default OrderSuccessReceipt;
