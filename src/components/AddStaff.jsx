import { useState } from "react";
import FormField from "./receptionist/FormField";
import Loader from "./Loader";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function AddStaff() {
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Name: "",
    email: "",
    role: "Waiter",
    password: "",
    number: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      number: form.number,
      password: form.password,
      name: form.Name,
      email: form.email,
      role: form.role,
    };

    try {
      setVis(true);
      await apiClient.post("createUsers", payload);
      navigate("/Admin/Staff");
    } catch (error) {
      setVis(false);
      console.error("Error creating staff:", error);
      alert(error.response?.data?.message || "Error adding staff member.");
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
          Add New Staff Member
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2"
        >
          <FormField label="Name :">
            <input
              name="Name"
              value={form.Name}
              onChange={handleChange}
              className={inputClass}
              type="text"
              required
            />
          </FormField>

          <FormField label="Email :">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              type="email"
            />
          </FormField>

          <FormField label="Role :">
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className={`${inputClass} pr-8`}
              required
            >
              <option value="Waiter">Waiter</option>
              <option value="Receptionist">Receptionist</option>
              <option value="admin">Admin</option>
            </select>
          </FormField>

          <FormField label="Password :">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className={inputClass}
              type="password"
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

          <div className="md:col-span-2 flex justify-center pt-8">
            <button
              type="submit"
              className="h-[46px] w-[220px] bg-[#4b0d0d] text-[20px] font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4b0d0d] rounded cursor-pointer"
            >
              Add Staff
            </button>
          </div>
        </form>
      </section>
      <Loader vis={vis} />
    </div>
  );
}