import { useEffect, useState } from "react";
import BookingRow from "./BookingRow";

export default function BookingsTable({ title, headers, data }) {
  const [headerLength, setHeaderLength] = useState(9);
  useEffect(() => {
    setHeaderLength(headers.length||9);
  }, []);
  console.log("BookingTable Rendered");
  return (
    <section
      aria-labelledby="booking-title"
      className="mt-14 rounded-sm bg-[#dfdfdf] px-8 py-6"
    >
      <h2
        id="booking-title"
        className="mb-4 text-center text-[26px] font-medium text-[#5b1d14]"
      >
        {title}
      </h2>

      <div
        role="row"
        className={`w-full grid grid-cols-${headerLength} bg-[#4b0d0d] py-3 text-[18px] font-medium text-white`}
      >
        {headers.map((h) => (
          <div key={h} role="columnheader" className="text-center">
            {h}
          </div>
        ))}

        {/* <div
            role="columnheader"
            className=" text-center"
          >
            Action
          </div> */}
      </div>

      <div role="table" className="mt-4 space-y-4">
        {data?.map((booking, index) => (
          <BookingRow key={booking.id} booking={booking} headers={headers} />
        ))}
      </div>
    </section>
  );
}
