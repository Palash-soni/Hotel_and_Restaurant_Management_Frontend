import React from "react";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";

const Contact = () => {
  return (
    <div className="bg-gray-100">


      <section className="text-center py-12 px-6">
        <h1 className="text-5xl font-bold text-[#5b2d0b]">Contact Us</h1>
        <p className="italic text-gray-600 mt-3 text-lg">
          We’re here to help—get in touch anytime!
        </p>
      </section>

      <ContactForm />

      <section className="max-w-3xl mx-auto text-center text-gray-700 px-6 py-10">
        <p>
          Have a question or need support? Get in touch with us today. Whether
          it’s about reservations, services, or feedback, we are here to help
          you with quick and friendly assistance.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;