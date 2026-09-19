import React from "react";
import ExploreCard from "./ExploreCard";

const ExploreSection = () => {
  const data = [
    {
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Luxury Rooms",
      subtitle: "AC / Non AC Rooms",
      url:"/Rooms"
    },
    {
      image: "https://images.unsplash.com/photo-1744776411221-702f2848b0b2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Restaurant",
      subtitle: "Breakfast / Lunch / Dinner",
      url:"/Restaurant"
    }, 
    {
      image: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Marriage Hall",
      subtitle: "Marriage / Birthday / Other Occasion",
      url:"/Contact"
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="bg-[#7a5a40] text-white rounded-3xl p-6 md:p-8 max-w-3xl mx-auto mb-12">
          <p className="text-sm md:text-base leading-relaxed">
            “Experience the perfect blend of comfortable stays and delightful dining.
            Our hotel and restaurant offer elegant rooms, exceptional service, and
            carefully crafted meals to make every visit truly special.”
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-2">Explore</h2>
        <div className="w-32 h-[2px] bg-[#5b2d0b] mx-auto mb-10" />

        <div className="grid gap-8 md:grid-cols-3">
          {data.map((item, index) => (
            <ExploreCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;