import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const number = localStorage.getItem("number");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logOut = () => {
    if (number) {
      apiClient
        .get(`allUsers/setStatus?status=I&id=${number}`)
        .catch((err) => console.log("Status update error on logout:", err))
        .finally(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("number");
          localStorage.removeItem("name");
          window.location.href = "/";
        });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("number");
      localStorage.removeItem("name");
      window.location.href = "/";
    }
  };

  const workArea = (userRole) => {
    const r = (userRole || "").toLowerCase();
    if (r === "admin") {
      window.location.href = "/Admin/Dashboard";
    } else if (r === "receptionist") {
      window.location.href = "/Receptionist/Home";
    } else if (r === "waiter") {
      window.location.href = "/Waiter/Home";
    } else if (r === "customer") {
      window.location.href = "/MyBookings";
    } else {
      window.location.href = "/Unauthorized";
    }
  };

  const isLoggedIn = Boolean(token && role);

  return (
    <header className="bg-[#5b2d0b] text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-wide text-[#FFCF71]">
          Innovo Hotels
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-sm">
          <Link
            to="/"
            className="hover:text-[#FFCF71] font-semibold transition"
          >
            Home
          </Link>
          <Link
            to="/Rooms"
            className="hover:text-[#FFCF71] font-semibold transition"
          >
            Rooms
          </Link>
          <Link
            to="/Restaurant"
            className="hover:text-[#FFCF71] font-semibold transition"
          >
            Restaurant
          </Link>
          <Link
            to="/Gallery"
            className="hover:text-[#FFCF71] font-semibold transition"
          >
            Gallery
          </Link>
          <Link
            to="/About"
            className="hover:text-[#FFCF71] font-semibold transition"
          >
            About
          </Link>
          <Link
            to="/Contact"
            className="hover:text-[#FFCF71] font-semibold transition"
          >
            Contact
          </Link>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {!isLoggedIn ? (
            <>
              <Link to="/SignUp">
                <button className="border font-semibold border-white px-4 py-1.5 rounded-md hover:bg-white hover:text-[#5b2d0b] transition cursor-pointer text-sm">
                  Sign Up
                </button>
              </Link>
              <Link to="/Login">
                <button className="bg-white border font-semibold text-[#5b2d0b] px-4 py-1.5 rounded-md hover:bg-transparent hover:text-white hover:border-white transition cursor-pointer text-sm">
                  Log In
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => workArea(role)}
                className="border font-semibold border-[#FFCF71] text-[#FFCF71] px-4 py-1.5 rounded-md hover:bg-[#FFCF71] hover:text-[#5b2d0b] transition cursor-pointer text-sm"
              >
                {role.toLowerCase() === "customer"
                  ? "My Bookings"
                  : "Workspace"}
              </button>
              <button
                onClick={logOut}
                className="border font-semibold border-white px-4 py-1.5 rounded-md hover:bg-white hover:text-[#5b2d0b] transition cursor-pointer text-sm"
              >
                Log Out
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#4a2408] px-6 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#FFCF71] py-1"
          >
            Home
          </Link>
          <Link
            to="/Rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#FFCF71] py-1"
          >
            Rooms
          </Link>
          <Link
            to="/Restaurant"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#FFCF71] py-1"
          >
            Restaurant
          </Link>
          <Link
            to="/Gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#FFCF71] py-1"
          >
            Gallery
          </Link>
          <Link
            to="/About"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#FFCF71] py-1"
          >
            About
          </Link>
          <Link
            to="/Contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-[#FFCF71] py-1"
          >
            Contact
          </Link>
          <div className="pt-2 border-t border-[#6b350d] flex gap-3">
            {!isLoggedIn ? (
              <>
                <Link to="/SignUp" onClick={() => setMobileMenuOpen(false)}>
                  <button className="border border-white px-4 py-1 rounded text-sm">
                    Sign Up
                  </button>
                </Link>
                <Link to="/Login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="bg-white text-[#5b2d0b] px-4 py-1 rounded text-sm font-semibold">
                    Log In
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    workArea(role);
                  }}
                  className="border border-[#FFCF71] text-[#FFCF71] px-3 py-1 rounded text-sm font-semibold"
                >
                  {role.toLowerCase() === "customer"
                    ? "My Bookings"
                    : "Workspace"}
                </button>
                <button
                  onClick={logOut}
                  className="border border-white px-3 py-1 rounded text-sm"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
