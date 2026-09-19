import { StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const HomeReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const stars = Array(5).fill(0);

  useEffect(() => {
    apiClient
      .get("review/approved/")
      .then((response) => {
        setReviews(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching approved reviews:", error);
      });
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#5b2d0b]">Customer Reviews</h2>
        <p className="italic text-gray-600 mt-2">What our happy guests say</p>

        <div className="w-24 h-[2px] bg-[#5b2d0b] mx-auto mt-4 mb-10" />

        {reviews.length === 0 ? (
          <p className="text-gray-500 py-8">No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={review._id || i}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col justify-between"
              >
                <div className="flex justify-center mb-3">
                  {stars.map((_, index) => (
                    <StarIcon
                      key={index}
                      size={20}
                      color={review.star > index ? "#F2C265" : "#d1d5db"}
                      fill={review.star > index ? "#F2C265" : "transparent"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm mb-4">"{review.message}"</p>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-500">
                  <span className="font-semibold text-[#5b2d0b]">{review.name || "Valued Guest"}</span>
                  <span>{review.type || "Stay"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeReviewSection;
