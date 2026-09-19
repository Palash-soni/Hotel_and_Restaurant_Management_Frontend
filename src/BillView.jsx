import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "./api/apiClient";

const BillView = () => {
  const [type, setType] = useState("");
  const [purpose, setPurpose] = useState("Booking");
  const [roomType, setRoomType] = useState("");
  const [orderAmount, setOrderAmount] = useState(0);
  const [members, setMembers] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};
  const pageData = location.state || {};
  const currDate = new Date().toLocaleString();

  useEffect(() => {
    if (data.amount) {
      setOrderAmount(Number(data.amount));
    }

    if (data.tableID) {
      setType("Table");
      if (data.items) {
        setPurpose("Dine-In");
      } else {
        setMembers(data.members || 0);
      }
    } else if (data.roomID) {
      setType("Room");
      setRoomType(data.roomType);
      setMembers(data.members || 0);
    } else if (data.orderID && data.tableId) {
      setType("Table");
      setPurpose("Dine-In");
      setMembers("-");

      const calculated = Array.isArray(data.orderID)
        ? data.orderID.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;
      setOrderAmount(calculated);
    }
  }, []);

  const handlePayment = async () => {
    try {
      // 1. Create Razorpay order on backend
      const res = await apiClient.post("api/payment/create-order", {
        amount: orderAmount,
      });

      const order = res.data.order;
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SHwvvXYUzp0o1r";

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        name: "Hotel & Restaurant",
        description: "Booking Payment",
        order_id: order.id,

        handler: async function (response) {
          // 3. Verify payment signature
          try {
            const verifyRes = await apiClient.post("api/payment/verify-payment", response);

            if (verifyRes.data.success) {
              if (pageData.tableID) {
                await apiClient.post("createTableBooking", pageData);
                await apiClient.get(`allTables/update?status=B&id=${pageData.tableID}`);
              } else if (pageData.roomID) {
                await apiClient.post("roomBooking/add", pageData);
                await apiClient.get(`allRooms/update?status=B&id=${pageData.roomID}`);
              } else if (pageData.orderID) {
                const tableNum = pageData.tableId || pageData.tableID;
                await apiClient.post(`api/orders/DineInBookings?tableID=${tableNum}&amt=${orderAmount}`, {
                  tableID: tableNum,
                  totalAmount: orderAmount,
                });
              }

              navigate("/OrderSuccessReceipt", { state: { ...pageData, totalAmount: orderAmount } });
            } else {
              alert("Payment verification failed. Please try again.");
            }
          } catch (err) {
            console.error("Error processing booking after payment:", err);
            alert("Error finalizing booking. Please contact support.");
          }
        },

        prefill: {
          name: localStorage.getItem("name") || "Guest User",
          contact: localStorage.getItem("number") || "9999999999",
        },

        theme: {
          color: "#5b0f0f",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert(error.response?.data?.message || "Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="max-h-[90vh] flex flex-col justify-between w-full max-w-lg bg-white rounded-2xl text-black shadow-2xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col gap-3 w-full p-6 overflow-auto text-[14px]">
          <div className="text-center text-2xl font-bold text-[#5b0f0f] py-2">Booking Summary & Bill</div>
          
          <div className="w-full flex justify-between px-4 py-2 border-b border-t border-gray-300 font-mono text-xs">
            <span className="font-bold">Role: {localStorage.getItem("role") || "Customer"}</span>
            <span>{currDate}</span>
          </div>

          <div className="w-full flex justify-between px-4 py-1">
            <span className="font-semibold text-gray-700">Bill Type</span>
            <span>{type || "Reservation"}</span>
          </div>

          <div className="w-full flex justify-between px-4 py-1">
            <span className="font-semibold text-gray-700">Purpose</span>
            <span>{purpose}</span>
          </div>

          {data.members && (
            <div className="w-full flex justify-between px-4 py-1">
              <span className="font-semibold text-gray-700">No. of Guests</span>
              <span>{data.members}</span>
            </div>
          )}

          {roomType && (
            <>
              <div className="w-full flex justify-between px-4 py-1">
                <span className="font-semibold text-gray-700">Room Type</span>
                <span>{data.roomType}</span>
              </div>
              <div className="w-full flex justify-between px-4 py-1">
                <span className="font-semibold text-gray-700">Check In Date</span>
                <span>{data.checkInDate}</span>
              </div>
              <div className="w-full flex justify-between px-4 py-1">
                <span className="font-semibold text-gray-700">Check Out Date</span>
                <span>{data.checkOutDate}</span>
              </div>
            </>
          )}

          {data.orderID && Array.isArray(data.orderID) && (
            <div className="mt-2 border-t border-gray-300 pt-2">
              <div className="w-full flex justify-between px-4 py-1 font-semibold text-gray-800 border-b border-gray-200">
                <span>Item</span>
                <span className="flex gap-8">
                  <span>Price</span>
                  <span>Qty</span>
                  <span>Total</span>
                </span>
              </div>
              {data.orderID.map((item, index) => (
                <div className="w-full flex justify-between px-4 py-1 text-xs" key={index}>
                  <span>{item.name}</span>
                  <span className="flex gap-8">
                    <span>₹{item.price}</span>
                    <span>{item.quantity}</span>
                    <span className="font-semibold">₹{item.quantity * item.price}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex justify-between px-6 py-4 text-lg border-t-2 border-gray-300 bg-gray-50 font-bold text-[#5b0f0f]">
          <span>Total Payable Amount</span>
          <span>₹{orderAmount}</span>
        </div>

        <div className="w-full flex items-center justify-center p-4 bg-gray-50">
          <button
            onClick={handlePayment}
            className="bg-[#5b0f0f] w-full py-3 rounded-xl text-white font-semibold text-lg cursor-pointer hover:bg-[#4a0c0c] transition shadow-md"
          >
            Proceed to Pay ₹{orderAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillView;
