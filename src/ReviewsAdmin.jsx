import { useEffect, useState } from "react";
import ReviewsHeader from "./components/reviews/ReviewsHeader";
import ReviewsTable from "./components/reviews/ReviewsTable";
import apiClient from "./api/apiClient";

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    apiClient
      .get("review/unapproved/")
      .then((response) => {
        setReviews(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching unapproved reviews:", error);
      });
  }, []);

  return (
    <main className="w-full px-8 py-6 lg:px-12">
      <ReviewsHeader />
      <ReviewsTable data={reviews} />
    </main>
  );
}