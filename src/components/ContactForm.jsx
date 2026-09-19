import React, { useState } from "react";
import apiClient from "../api/apiClient";

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await apiClient.post("api/contact", form);
      setSuccessMsg(response.data.message || "Thank you for contacting us! We will respond shortly.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setErrorMsg(error.response?.data?.message || "Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto border-2 border-[#5b2d0b] rounded-3xl p-6 md:p-10 space-y-6 bg-white shadow-xl"
    >
      {successMsg && (
        <div className="p-4 bg-green-100 text-green-800 rounded-xl font-medium text-center border border-green-300">
          ✓ {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-100 text-red-800 rounded-xl font-medium text-center border border-red-300">
          ✕ {errorMsg}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">First Name :</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            className="w-full border-2 border-[#5b2d0b] rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#5b2d0b]"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Last Name :</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className="w-full border-2 border-[#5b2d0b] rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#5b2d0b]"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">E-mail :</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full border-2 border-[#5b2d0b] rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#5b2d0b]"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Phone No. :</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full border-2 border-[#5b2d0b] rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#5b2d0b]"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">Message :</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="5"
          placeholder="How can we help you?"
          className="w-full border-2 border-[#5b2d0b] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5b2d0b] resize-none"
          required
        />
      </div>

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#5b2d0b] text-white px-12 py-3 rounded-full hover:opacity-90 transition font-semibold text-lg cursor-pointer shadow-md disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;