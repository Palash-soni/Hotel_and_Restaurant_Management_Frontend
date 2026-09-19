import React, { useState } from "react";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      number: formData.mobile,
      password: formData.password,
    };

    try {
      setVis(true);
      const response = await apiClient.post("login", payload);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("number", response.data.number);
        localStorage.setItem("name", response.data.name);

        const userRole = (response.data.role || "").toLowerCase();

        if (userRole === "admin") {
          window.location.href = "/Admin/Dashboard";
        } else if (userRole === "receptionist") {
          window.location.href = "/Receptionist/Home";
        } else if (userRole === "waiter") {
          window.location.href = "/Waiter/Home";
        } else {
          window.location.href = "/";
        }
      } else {
        setVis(false);
        setErr(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setVis(false);
      console.error("Login error:", error);
      setErr(error.response?.data?.message || "Invalid Mobile Number or Password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Mobile */}
      <div>
        <label className="block text-[#5a0f0f] text-lg mb-2">
          Mobile Number :
        </label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter registered mobile number"
          className="w-full h-12 px-4 bg-white outline-none border border-gray-300 rounded"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-[#5a0f0f] text-lg mb-2">
          Password :
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full h-12 px-4 bg-white outline-none border border-gray-300 rounded"
          required
        />

        {err && (
          <div className="mt-2 text-red-600 font-semibold text-sm">
            {err}
          </div>
        )}
      </div>

      {/* Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="bg-[#5a0f0f] text-white px-20 py-3 text-lg font-semibold hover:bg-[#4a0c0c] transition rounded cursor-pointer"
        >
          Log In
        </button>
      </div>

      <hr className="border-t border-gray-500 mt-6" />

      <div className="text-center pt-2 flex gap-3 items-center justify-center text-lg">
        New User?
        <Link to="/Signup">
          <span className="text-[#5a0f0f] text-lg cursor-pointer font-semibold hover:underline">
            Sign Up
          </span>
        </Link>
      </div>

      <Loader vis={vis} />
    </form>
  );
};

export default LoginForm;