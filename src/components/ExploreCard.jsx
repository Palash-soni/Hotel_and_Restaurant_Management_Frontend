import React from "react";
import { Link } from "react-router-dom";

const ExploreCard = ({ image, title, subtitle,url }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden text-center">
      <img src={image} alt={title} className="w-full h-56 object-cover" />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>

<Link to={url}>
        <button className="border cursor-pointer border-black px-4 py-1 rounded-md hover:bg-black hover:text-white transition">
          Book Now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreCard;