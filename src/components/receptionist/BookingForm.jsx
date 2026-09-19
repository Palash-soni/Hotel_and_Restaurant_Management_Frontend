import { useState } from "react";
import FormField from "./FormField";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function BookingForm() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    number: "",
    roomType: "",
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

    if (form.checkInDate < today) {
      setMessage("Check-in date cannot be before today's date.");
      return;
    }

    if (form.checkOutDate <= form.checkInDate) {
      setMessage("Check-out date must be after check-in date.");
      return;
    }

    const d1 = new Date(form.checkInDate);
    const d2 = new Date(form.checkOutDate);

    apiClient
      .post("roomBooking/available", {
        roomType: form.roomType,
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
      })
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const diff = d2 - d1;
          const days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
          const pricePerNight = Number(response.data[0].pricePerNight || 5000);

          const payload = {
            roomID: response.data[0].roomID,
            userName: form.customerName,
            number: form.number,
            status: "Booked",
            checkInDate: form.checkInDate,
            checkOutDate: form.checkOutDate,
            checkInTime: form.checkInTime,
            roomType: form.roomType,
            amount: pricePerNight * days,
            members: Number(response.data[0].capacity || 2),
          };

          navigate("/BillView", { state: payload });
        } else {
          setMessage("No rooms available for the selected dates and type.");
        }
      })
      .catch((error) => {
        console.error("Error checking room availability:", error);
        setMessage("Error checking room availability.");
      });
  }

  const inputClass =
    "h-[44px] w-full rounded-sm border border-transparent bg-white px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#4b0d0d]";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2"
    >
      <FormField label="Customer Name :">
        <input
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          className={inputClass}
          type="text"
          required
        />
      </FormField>

      <FormField label="Mobile Number :">
        <input
          name="number"
          value={form.number}
          onChange={handleChange}
          className={inputClass}
          type="tel"
          required
        />
      </FormField>

      <FormField label="Room Type :">
        <select
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
          className={`${inputClass} pr-8`}
          required
        >
          <option value="">Select Room Type</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Deluxe">Deluxe</option>
        </select>
      </FormField>

      <FormField label="Check In Date :">
        <input
          name="checkInDate"
          min={today}
          value={form.checkInDate}
          onChange={handleChange}
          className={inputClass}
          type="date"
          required
        />
      </FormField>

      <FormField label="Check Out Date :">
        <input
          name="checkOutDate"
          min={getNextDay(form.checkInDate)}
          value={form.checkOutDate}
          onChange={handleChange}
          className={inputClass}
          type="date"
          required
        />
      </FormField>

      <FormField label="Check In Time :">
        <input
          name="checkInTime"
          value={form.checkInTime}
          onChange={handleChange}
          className={inputClass}
          type="time"
          required
        />
      </FormField>

      {message && (
        <div className="md:col-span-2 text-center text-red-600 font-semibold">{message}</div>
      )}

      <div className="md:col-span-2 flex justify-center pt-4">
        <button
          type="submit"
          className="h-[46px] w-[220px] bg-[#4b0d0d] text-[20px] font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4b0d0d] rounded cursor-pointer"
        >
          Submit Booking
        </button>
      </div>
    </form>
  );
}