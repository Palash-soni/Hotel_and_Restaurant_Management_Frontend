import React from "react";
import Footer from "./components/Footer";
import ReservationForm from "./components/ReservationForm";
import InfoSection from "./components/InfoSection";

const Restaurant = () => {



  
  return (
    <div className="bg-gray-100">

      <section className="relative h-[60vh] flex items-center justify-center text-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=889&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fine dine"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <h1 className="relative z-10 text-white text-3xl md:text-5xl italic font-serif">
          “A Fine Dine Experience You'll Remember”
        </h1>
      </section>

      <section className="text-center py-12 px-6">
        <h2 className="text-4xl font-bold">Reserve Your Table</h2>
        <p className="italic text-gray-600 mt-2">
          Serving Happiness on Every Plate
        </p>
        <div className="w-40 h-[2px] bg-[#5b2d0b] mx-auto mt-4" />
      </section>

      <ReservationForm />

      <InfoSection />

      <Footer />
    </div>
  );
};

export default Restaurant;