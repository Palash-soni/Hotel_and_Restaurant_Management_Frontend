import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[70vh] md:h-[90vh]">
      <img
        src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hotel Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 " />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif italic max-w-4xl">
          “A Taste of Tradition, A Stay of Comfort”
        </h2>
      </div>
    </section>
  );
};

export default Hero;