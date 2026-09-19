import React from "react";

const AboutSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3a1e00] mb-12">
        About Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hotel exterior"
          className="w-full h-[420px] object-cover shadow-md"
        />

        <div className="space-y-6 text-[#3a1e00] leading-relaxed">
          <p>
            Welcome to [Your Hotel & Restaurant Name], where comfort,
            quality, and great taste come together to create unforgettable
            experiences. We are dedicated to providing our guests with warm
            hospitality, delicious food, and a relaxing stay.
          </p>

          <p>
            Our hotel offers well-furnished rooms with modern amenities,
            designed to give you a peaceful and comfortable environment.
            Whether you are traveling for business or leisure, we ensure
            that your stay with us is pleasant and memorable.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-6 text-[#3a1e00] leading-relaxed">
        <p>
          At our restaurant, we serve a wide variety of freshly prepared
          dishes made from high-quality ingredients. From traditional
          flavors to modern cuisine, our expert chefs focus on taste,
          hygiene, and presentation in every meal.
        </p>

        <p>
          We believe in customer satisfaction, honesty, and excellence in
          service. Our friendly staff is always ready to assist you and
          make you feel at home. Every guest is important to us, and we
          strive to exceed your expectations every time you visit.
        </p>

        <p className="text-center font-semibold">
          Thank you for choosing [Your Hotel & Restaurant Name].
          <br />
          We look forward to welcoming you and serving you with the best
          of comfort and taste.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
