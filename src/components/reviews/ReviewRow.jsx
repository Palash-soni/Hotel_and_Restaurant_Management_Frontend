import { Check, StarIcon, X } from "lucide-react";
import apiClient from "../../api/apiClient";

export default function ReviewRow({ review }) {
  const stars = Array(5).fill(0);

  const handleApprove = () => {
    apiClient
      .get(`review/action?approved=Y&id=${review._id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error approving review:", error);
      });
  };

  const handleUnApprove = () => {
    apiClient
      .get(`review/action?approved=N&id=${review._id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error rejecting review:", error);
      });
  };

  return (
    <div
      role="row"
      className="relative flex min-h-[56px] items-center bg-white px-6 py-3 text-[15px] text-[#5b1d14] border-b border-gray-200"
    >
      <div className="grid w-full grid-cols-4 items-center gap-4">
        <div role="cell" className="text-center font-semibold">
          {review.name || "Anonymous"}
        </div>

        <div role="cell" className="flex justify-center">
          <div className="flex gap-1">
            {stars.map((_, index) => (
              <StarIcon
                key={index}
                size={18}
                color={review.star > index ? "#F2C265" : "#e5e7eb"}
                fill={review.star > index ? "#F2C265" : "transparent"}
              />
            ))}
          </div>
        </div>

        <div role="cell" className="px-2 text-center text-sm text-gray-700">
          {review.message}
        </div>

        <div role="cell" className="flex justify-center gap-3">
          <button
            aria-label="Approve review"
            title="Approve Review"
            className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-full bg-[#4f7f2a] text-white hover:brightness-110 shadow-sm transition"
            onClick={handleApprove}
          >
            <Check size={16} strokeWidth={3} />
          </button>

          <button
            aria-label="Reject review"
            title="Reject Review"
            className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-full bg-[#ff3b30] text-white hover:brightness-110 shadow-sm transition"
            onClick={handleUnApprove}
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}