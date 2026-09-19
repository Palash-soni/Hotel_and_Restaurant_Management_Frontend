import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const ReservationForm = () => {
  const [persons, setPersons] = useState(1);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  const userNumber = localStorage.getItem("number");

  useEffect(() => {
    if (userNumber) {
      apiClient
        .get("allUsers?num=" + userNumber)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userNumber]);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book a table.");
      navigate("/Login");
      return;
    }

    if (formData.bookingDate < today) {
      setMessage("Booking date cannot be before today's date.");
      return;
    }

    try {
      const response = await apiClient.post("allTables/available", {
        bookingDate: formData.bookingDate,
        bookingTime: formData.bookingTime,
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        const payload = {
          tableID: response.data[0].tableID,
          userName: userData?.name || localStorage.getItem("name") || "Guest",
          number: userData?.number || localStorage.getItem("number") || "",
          status: "Booked",
          bookingDate: formData.bookingDate,
          bookingTime: formData.bookingTime,
          members: persons,
          amount: 500,
        };
        navigate("/BillView", { state: payload });
      } else {
        setMessage("No tables available for the selected date and time.");
      }
    } catch (error) {
      console.error("Error checking table availability:", error);
      setMessage("No tables available for the selected slot.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
    >
      <img
        src="https://images.unsplash.com/photo-1599458252573-56ae36120de1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Restaurant"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 grid md:grid-cols-2 gap-6 md:gap-20 p-10 md:p-16 text-white">
        <div className="space-y-4">
          <label className="block text-sm font-semibold">Date</label>
          <input
            type="date"
            name="bookingDate"
            min={today}
            value={formData.bookingDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-white text-black cursor-pointer shadow-sm outline-none"
            required
          />
          <div className="h-3 hidden md:block"></div>
          <label className="block text-sm font-semibold">No. of Persons</label>
          <div className="flex items-center justify-around gap-4 bg-white text-black px-4 py-2 rounded shadow-sm">
            <button
              type="button"
              className="text-xl font-bold cursor-pointer text-[#5b2d0b] px-3 py-1 hover:bg-gray-100 rounded"
              onClick={() => setPersons(Math.max(1, persons - 1))}
            >
              -
            </button>
            <span className="font-bold text-lg">
              {persons} {persons === 1 ? "Person" : "Persons"}
            </span>
            <button
              type="button"
              className="text-xl font-bold cursor-pointer text-[#5b2d0b] px-3 py-1 hover:bg-gray-100 rounded"
              onClick={() => setPersons(Math.min(20, persons + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-end">
          <label className="block text-sm font-semibold">Time Slot</label>
          <input
            type="time"
            className="w-full px-4 py-3 rounded bg-white text-black cursor-pointer shadow-sm outline-none"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            required
          />
          <div className="h-4 hidden md:block"></div>

          <button
            type="submit"
            className="border-2 border-white py-3 font-semibold cursor-pointer rounded-lg bg-white/10 hover:bg-white hover:text-black transition duration-200 text-lg shadow-lg"
          >
            Reserve Table Now
          </button>
          {message && (
            <div className="text-red-400 font-semibold text-center mt-2 bg-black/40 py-1 rounded">
              {message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ReservationForm;
