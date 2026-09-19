import { useState } from "react";
import FormField from "./FormField";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function TableBookingForm() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    number: "",
    members: 1,
    bookingDate: "",
    bookingTime: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  }

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e) {
    e.preventDefault();

    if (form.bookingDate < today) {
      setMessage("Booking date cannot be before today's date.");
      return;
    }

    apiClient
      .post("allTables/available", {
        bookingDate: form.bookingDate,
        bookingTime: form.bookingTime,
      })
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const payload = {
            tableID: response.data[0].tableID,
            userName: form.customerName,
            number: form.number,
            status: "Booked",
            bookingDate: form.bookingDate,
            bookingTime: form.bookingTime,
            members: Number(form.members),
            amount: 500,
          };

          navigate("/BillView", { state: payload });
        } else {
          setMessage("No tables available for the selected slot.");
        }
      })
      .catch((error) => {
        console.error("Error checking table availability:", error);
        setMessage("Error checking table availability.");
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

      <FormField label="Mobile No. :">
        <input
          name="number"
          value={form.number}
          onChange={handleChange}
          className={inputClass}
          type="tel"
          required
        />
      </FormField>

      <FormField label="Number of Members :">
        <input
          name="members"
          value={form.members}
          onChange={handleChange}
          className={inputClass}
          type="number"
          min={1}
          max={20}
          required
        />
      </FormField>

      <FormField label="Date :">
        <input
          name="bookingDate"
          min={today}
          value={form.bookingDate}
          onChange={handleChange}
          className={inputClass}
          type="date"
          required
        />
      </FormField>

      <FormField label="Time :">
        <input
          name="bookingTime"
          value={form.bookingTime}
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
          Submit Table Booking
        </button>
      </div>
    </form>
  );
}