import React from "react";

const GalleryHero = () => {
  return (
    <section className="relative h-[300px] md:h-[380px] w-full">
      <img
        src="https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hotel gallery hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
          Gallery
        </h1>

        <p className="text-white italic text-lg md:text-2xl mt-2 font-light">
          Explore our gallery to see the beauty
        </p>
      </div>
    </section>
  );
};

export default GalleryHero;
