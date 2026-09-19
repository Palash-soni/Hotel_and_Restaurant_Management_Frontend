import { useEffect, useState } from "react";
import FormField from "../receptionist/FormField";
import Loader from "../Loader";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    roomID: "",
    roomType: "",
    pricePerNight: 0,
    capacity: 0,
    description: "",
  });

  const [formRoomID, setFormRoomID] = useState("");

  useEffect(() => {
    apiClient
      .get("allRooms")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const maxNum = response.data.reduce((max, item) => {
            const num = parseInt(String(item.roomID).replace(/\D/g, ""), 10);
            return !isNaN(num) && num > max ? num : max;
          }, 0);
          setFormRoomID("R" + (maxNum + 1));
        } else {
          setFormRoomID("R1");
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      roomID: formRoomID,
      roomType: form.roomType,
      pricePerNight: Number(form.pricePerNight),
      capacity: Number(form.capacity),
      description: form.description,
    };

    try {
      setVis(true);
      await apiClient.post("createRoom", payload);
      navigate("/Admin/Rooms");
    } catch (error) {
      setVis(false);
      console.error("Error posting room data:", error);
      alert(error.response?.data?.message || "Error creating room.");
    }
  };

  const inputClass =
    "h-[44px] w-full rounded-sm border border-transparent bg-white px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#4b0d0d]";

  return (
    <div className="py-16 w-full">
      <section
        aria-labelledby="book-new-room"
        className="mx-auto w-full max-w-[980px] bg-[#dedede] px-10 py-10 md:px-14 md:py-10 shadow-lg rounded-xl"
      >
        <h2
          id="book-new-room"
          className="mb-12 text-center text-[26px] font-medium text-[#4b0d0d]"
        >
          Add New Room
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-x-16 gap-y-5 md:grid-cols-2"
        >
          <FormField label="Room ID :">
            <input
              name="roomID"
              value={formRoomID}
              onChange={handleChange}
              className={inputClass}
              type="text"
              disabled={true}
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
              <option value="">Select Type</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Deluxe">Deluxe</option>
            </select>
          </FormField>

          <FormField label="Price Per Night :">
            <input
              name="pricePerNight"
              value={form.pricePerNight}
              onChange={handleChange}
              className={inputClass}
              type="number"
              required
            />
          </FormField>

          <FormField label="Room's Capacity :">
            <input
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className={inputClass}
              type="number"
              max={10}
              min={1}
              required
            />
          </FormField>

          <FormField label="Description :">
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
              type="text"
            />
          </FormField>

          <div className="md:col-span-2 flex justify-center pt-8">
            <button
              type="submit"
              className="h-[46px] w-[220px] bg-[#4b0d0d] text-[20px] font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4b0d0d] rounded cursor-pointer"
            >
              Add Room
            </button>
          </div>
        </form>
      </section>
      <Loader vis={vis} />
    </div>
  );
}
