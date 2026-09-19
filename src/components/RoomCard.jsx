import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const RoomCard = ({ roomType, price, image, desc, capacity }) => {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    checkInDate: "",
    checkOutDate: "",
    checkInTime: "10:00",
  });

  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  function getNextDay(dateStr) {
    if (!dateStr) return today;
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "checkInDate") {
      setForm((prev) => {
        const updated = { ...prev, checkInDate: value };
        if (prev.checkOutDate && prev.checkOutDate <= value) {
          updated.checkOutDate = "";
        }
        return updated;
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book a room.");
      navigate("/Login");
      return;
    }

    if (form.checkInDate < today) {
      setMessage("Check-in date cannot be before today's date.");
      return;
    }

    if (form.checkOutDate <= form.checkInDate) {
      setMessage("Check-out date must be after Check-in date.");
      return;
    }

    const d1 = new Date(form.checkInDate);
    const d2 = new Date(form.checkOutDate);

    apiClient
      .post("roomBooking/available", {
        roomType: roomType,
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
      })
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const diff = d2 - d1;
          const days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
          const pricePerNight = Number(response.data[0].pricePerNight || price);

          const payload = {
            roomID: response.data[0].roomID,
            userName: localStorage.getItem("name") || "Guest",
            number: localStorage.getItem("number") || "",
            status: "Booked",
            checkInDate: form.checkInDate,
            checkOutDate: form.checkOutDate,
            checkInTime: form.checkInTime,
            roomType: roomType,
            amount: pricePerNight * days,
            members: capacity,
          };

          navigate("/BillView", { state: payload });
        } else {
          setMessage("No rooms available for the selected dates.");
        }
      })
      .catch((error) => {
        console.error("Error checking room availability:", error);
        setMessage("Unable to check room availability.");
      });
  }

  return (
    <div className="bg-[#5b2d0b] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-xl text-white">
      <img
        src={image}
        alt={roomType}
        className="w-full md:w-[45%] h-64 md:h-auto rounded-2xl object-cover shadow-md"
      />

      <form className="flex-1 flex flex-col justify-between" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-3xl font-bold mb-2 text-[#FFCF71]">{roomType} Room</h3>

          <p className="text-sm text-gray-200 mb-4 leading-relaxed">
            {desc}
          </p>

          <div className="mb-4">
            <span className="text-base font-semibold text-[#FFCF71]">Capacity:</span>{" "}
            <span className="text-base font-medium">{capacity} Guests</span>
          </div>

          <h4 className="text-lg font-semibold text-[#FFCF71] mb-2">Booking Details:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs mb-1 text-gray-200">Check-in Date:</label>
              <input
                type="date"
                name="checkInDate"
                min={today}
                value={form.checkInDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-white text-black cursor-pointer outline-none text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-gray-200">Check-out Date:</label>
              <input
                type="date"
                name="checkOutDate"
                min={getNextDay(form.checkInDate)}
                value={form.checkOutDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-white text-black cursor-pointer outline-none text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-gray-200">Check-in Time:</label>
              <input
                type="time"
                className="w-full px-3 py-2 rounded bg-white text-black cursor-pointer outline-none text-sm"
                name="checkInTime"
                value={form.checkInTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 border-t border-[#7a3f12] gap-4">
          <div>
            <span className="text-green-400 text-3xl font-bold">₹{price}</span>
            <span className="text-xs text-gray-300 ml-1">/ night</span>
          </div>

          {message && (
            <span className="font-medium text-red-300 text-sm bg-black/30 px-3 py-1 rounded">
              {message}
            </span>
          )}

          <button
            type="submit"
            className="border-2 border-white px-8 py-2.5 rounded-full hover:bg-white hover:text-[#5b2d0b] transition duration-200 font-semibold text-base shadow-lg cursor-pointer"
          >
            Book Room Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomCard;
