import React, { useState } from "react";
import Loader from "./Loader";
import apiClient from "../api/apiClient";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [warn, setWarn] = useState("");
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setWarn("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setWarn("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setWarn("Password must be at least 6 characters long");
      return;
    }

    const payload = {
      number: formData.phone,
      password: formData.password,
      name: formData.username,
      email: formData.email,
      role: "Customer",
    };

    try {
      setVis(true);
      const response = await apiClient.post("createUsers", payload);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("number", response.data.number);
        localStorage.setItem("name", response.data.name);
        window.location.href = "/";
      } else {
        // Fallback login
        const loginResponse = await apiClient.post("login", {
          number: formData.phone,
          password: formData.password,
        });

        if (loginResponse.data.token) {
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("role", loginResponse.data.role);
          localStorage.setItem("number", loginResponse.data.number);
          localStorage.setItem("name", loginResponse.data.name);
          window.location.href = "/";
        }
      }
    } catch (error) {
      setVis(false);
      console.error("Error signing up:", error);
      setWarn(error.response?.data?.message || "Error creating account. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username */}
      <div>
        <label className="block text-[#5a0f0f] text-lg mb-2">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full h-12 px-4 bg-white outline-none border border-gray-300 rounded"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-[#5a0f0f] text-lg mb-2">E-mail :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full h-12 px-4 bg-white outline-none border border-gray-300 rounded"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[#5a0f0f] text-lg mb-2">
          Phone Number:
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter 10-digit mobile number"
          className="w-full h-12 px-4 bg-white outline-none border border-gray-300 rounded"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-[#5a0f0f] text-lg mb-2">Password :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter secure password"
          className="w-full h-12 px-4 bg-white outline-none border border-gray-300 rounded"
          required
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-[#5a0f0f] text-lg mb-2">
          Confirm Password :
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
          className="w-full h-12 px-4 bg-white outline-none border border-gray-300 rounded"
          required
        />
      </div>

      {warn && (
        <div className="text-red-600 font-semibold text-sm">
          {warn}
        </div>
      )}

      {/* Button */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="bg-[#5a0f0f] text-white px-16 py-3 text-lg font-semibold hover:bg-[#4a0c0c] transition rounded cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-500 mt-6" />

      {/* Login Link */}
      <div className="text-center pt-2 flex items-center justify-center gap-3 text-lg">
        Already a User?
        <Link to="/Login">
          <span className="text-[#5a0f0f] text-lg font-semibold hover:underline cursor-pointer">
            Log In
          </span>
        </Link>
      </div>
      <Loader vis={vis} />
    </form>
  );
};

export default SignUpForm;
