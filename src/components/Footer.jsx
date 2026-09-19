import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#5b2d0b] text-white pt-12">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-2xl font-semibold">Innovo Hotels</h2>

        <p className="text-sm text-gray-200 max-w-2xl mx-auto">
          A perfect blend of comfortable stays and delightful dining. We offer
          elegant rooms, warm hospitality, and a memorable restaurant experience
          designed for relaxation and taste.
        </p>

        <h3 className="text-xl font-semibold">Thanks For Visit</h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm pt-6 border-t border-gray-400 items-center justify-center">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58936.397076333385!2d75.26883616430676!3d22.596869089064583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962367c2b90b645%3A0xfc24379c2506743a!2sDhar%2C%20Madhya%20Pradesh%20454001!5e0!3m2!1sen!2sin!4v1771482864962!5m2!1sen!2sin"
              width="150"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div>
            <p className="font-medium">Location:</p>
            <p>Dhar - 454001, Madhya Pradesh, India</p>
          </div>

          <div>
            <p>Phone: +91 XXXXXXXX</p>
            <p>Email: info@yourhotel.com</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 pt-6 pb-8">
          © 2026 Your Innovo Hotels. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
