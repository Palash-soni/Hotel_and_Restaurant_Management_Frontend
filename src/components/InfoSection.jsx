import React from "react";

const InfoSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Pre-booking a table for dine-in can be super convenient
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src="https://plus.unsplash.com/premium_photo-1670984939096-f3cfd48c7408?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dining"
          className="rounded-3xl w-full h-[420px] object-cover"
        />

        <ol className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <li>
            <strong>Guaranteed seating:</strong> You get to ensure a table is
            reserved for you and your crew, no matter how busy the restaurant is.
          </li>
          <li>
            <strong>Time-saving:</strong> No need to wait around for a table to
            become available.
          </li>
          <li>
            <strong>Special requests:</strong> Request specific tables or mention
            special occasions.
          </li>
          <li>
            <strong>Priority service:</strong> Faster food and drinks for
            pre-booked customers.
          </li>
          <li>
            <strong>Menu planning:</strong> Plan meals in advance and pre-order
            food.
          </li>
          <li>
            <strong>No cancellation worries:</strong> Change booking if plans
            change.
          </li>
        </ol>
      </div>
    </section>
  );
};

export default InfoSection;