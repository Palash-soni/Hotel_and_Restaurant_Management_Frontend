import React, { useEffect, useState } from "react";
import { ReceiptText, Star, StarIcon, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function CustomerBookingRow({ data }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [reviewType, setReviewType] = useState("");
  const [review, setReview] = useState(false);
  const [disp, setDisp] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);

  const stars = Array(5).fill(0);
  const colors = {
    orange: "#F2C265",
    grey: "#a9a9a9",
  };
  const [rating, setRating] = useState(5);
  const [hoverValue, setHoverValue] = useState(undefined);

  const [formData, setFormData] = useState({
    star: 5,
    message: "",
  });

  useEffect(() => {
    const currDate = new Date();
    setIsReviewed(Boolean(data.review));

    if (data.roomID) {
      const checkInDate = new Date(data.checkInDate);
      const checkOutDate = new Date(data.checkOutDate);

      if (checkInDate > currDate) {
        setStatus("Yet To Check In");
      } else if (checkOutDate > currDate) {
        setStatus("Checked In");
      } else {
        setStatus("Checked Out");
        setDisp(true);
      }
      setBookingType("Room");
      setReservationDate(data.checkInDate + " to " + data.checkOutDate);
    } else if (data.tableID) {
      const bookingDate = new Date(data.bookingDate);
      if (bookingDate > currDate) {
        setStatus("Upcoming");
      } else {
        setDisp(true);
        setStatus("Completed");
      }

      setReservationDate(data.bookingDate + " (" + (data.bookingTime || "") + ")");
      setBookingType("Table");
    }

    if (data.message) {
      setMessage(data.message);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: data._id,
      name: localStorage.getItem("name") || data.userName || "Customer",
      number: localStorage.getItem("number") || data.number || "",
      message: formData.message,
      star: formData.star,
      type: reviewType,
    };

    try {
      await apiClient.post("review/add", payload);
      setReview(false);
      setIsReviewed(true);
      alert("Thank you! Your review has been submitted for approval.");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.message || "Something went wrong submitting your review.");
    }
  };

  const handleClickStar = (value) => {
    setRating(value);
    setFormData((prev) => ({ ...prev, star: value }));
  };

  const handleMouseOverStar = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeaveStar = () => {
    setHoverValue(undefined);
  };

  return (
    <div
      className="relative grid grid-cols-7 items-center bg-white py-4 text-[14px] text-[#5b1d14] border-b border-gray-200 hover:bg-gray-50 transition"
      role="row"
    >
      <div role="cell" className="text-center font-semibold">
        {data.message ? message : bookingType}
      </div>

      <div role="cell" className="text-center">
        {data.createdAt ? String(data.createdAt).slice(0, 10) : "-"}
      </div>

      <div role="cell" className="text-center text-xs">
        {reservationDate}
      </div>

      <div role="cell" className="text-center">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            status === "Completed" || status === "Checked Out"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div role="cell" className="text-center font-bold">
        ₹{data.totalAmount || data.amount || 0}
      </div>

      <div role="cell" className="text-center">
        {data.members || data.capacity || 1}
      </div>

      {/* Actions */}
      <div role="cell" className="flex items-center justify-center gap-3">
        {!data.message && (
          <button
            aria-label="View Receipt"
            className="rounded-lg p-2 hover:bg-[#a13828] bg-[#5b1d14] text-white cursor-pointer transition shadow-sm"
            title="View Receipt"
            onClick={() => {
              navigate("/OrderSuccessReceipt", { state: data });
            }}
          >
            <ReceiptText size={16} />
          </button>
        )}

        {disp && (
          <button
            aria-label="Review Button"
            className={`rounded-lg p-2 text-white cursor-pointer transition shadow-sm ${
              isReviewed ? "bg-green-600 hover:bg-green-700" : "bg-[#5b1d14] hover:bg-[#a13828]"
            }`}
            title={isReviewed ? "Review Submitted" : "Add a Review"}
            onClick={() => {
              if (!isReviewed) {
                setReview(true);
                setReviewType(bookingType);
              } else {
                alert("Review already submitted for this booking!");
              }
            }}
          >
            {isReviewed ? <UserCheck size={16} /> : <Star size={16} />}
          </button>
        )}
      </div>

      {/* Review Modal */}
      {review && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 p-4">
          <form
            className="p-8 w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col items-center gap-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-[#5b1d14]">Rate Your Experience</h2>
            
            <div className="flex gap-2">
              {stars.map((_, index) => {
                const starVal = index + 1;
                return (
                  <StarIcon
                    key={index}
                    size={36}
                    className="cursor-pointer transition hover:scale-110"
                    color={
                      (hoverValue || rating) >= starVal
                        ? colors.orange
                        : colors.grey
                    }
                    fill={
                      (hoverValue || rating) >= starVal
                        ? colors.orange
                        : "transparent"
                    }
                    onClick={() => handleClickStar(starVal)}
                    onMouseOver={() => handleMouseOverStar(starVal)}
                    onMouseLeave={handleMouseLeaveStar}
                  />
                );
              })}
            </div>

            <textarea
              name="message"
              placeholder="Tell us about your stay or dining experience..."
              className="w-full h-28 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#5b1d14] text-sm resize-none"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <div className="flex gap-4 w-full">
              <button
                className="flex-1 py-2.5 bg-[#5b1d14] text-white rounded-lg font-semibold hover:bg-[#4a0c0c] transition cursor-pointer"
                type="submit"
              >
                Submit Review
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer"
                onClick={() => setReview(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
