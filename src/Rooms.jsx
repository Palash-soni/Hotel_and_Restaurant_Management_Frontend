import React from "react";
import Footer from "./components/Footer";
import RoomCard from "./components/RoomCard";

const Rooms = () => {
  const rooms = [
    { roomType: "Basic", price: 5000,desc:"A Basic Room with capacity of 2 members, with acoomodations like comfy bed, Air Conditioned Rooms with a massive balcony",capacity:2 ,image: "https://plus.unsplash.com/premium_photo-1678297269904-6c46528b36a7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { roomType: "Premium", price: 7500, desc:"A Premium Room with capacity of 3 members, with acoomodations like comfy bed, Air Conditioned Rooms with a massive balcony" ,capacity:3 ,image: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { roomType: "Deluxe", price: 10000, desc:"A Deluxe Room with capacity of 4 members, with acoomodations like comfy bed, Air Conditioned Rooms with a massive balcony" ,capacity:4 ,image: "https://images.unsplash.com/photo-1771775529138-a7a20ba7e032?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  return (
    <div className="bg-gray-100">
     

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center">Rooms</h1>
        <p className="text-center text-gray-600 mt-2">
          Comfortable spaces designed for rest and relaxation.
        </p>

        <div className="w-full h-[2px] bg-[#5b2d0b] my-6" />

        <div className="space-y-10">
          {rooms.map((room, i) => (
            <RoomCard key={i} {...room} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rooms;