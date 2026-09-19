import ReviewRow from "./ReviewRow";

export default function ReviewsTable({ data }) {
  return (
    <section className="mt-10 rounded-sm bg-[#dfdfdf] px-8 py-6">
      <h2 className="mb-4 text-center text-[26px] font-medium text-[#5b1d14]">
        Reviews
      </h2>

      {/* Header bar */}
      <div
        role="row"
        className="grid grid-cols-4 bg-[#4b0d0d] py-3 text-[18px] font-medium text-white"
      >
        <div role="columnheader" className="text-center">
          User Name
        </div>
        <div role="columnheader" className="text-center">
          Star
        </div>
        <div role="columnheader" className="text-center">
          Comment
        </div>
        <div role="columnheader" className="text-center">
          Action
        </div>
      </div>

      {/* Rows */}
      <div
        role="table"
        className="mt-5 space-y-4"
      >
        {data.map((review,index) => (
          <ReviewRow key={index} review={review} />
        ))}
      </div>
    </section>
  );
}