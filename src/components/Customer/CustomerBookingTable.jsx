import CustomerBookingRow from "./CustomerBookingRow";
import RoomRow from "./CustomerBookingRow";

export default function CustomerBookingTable({ data }) {
  return (
    <section
      aria-labelledby="room-details-title"
      className="mt-10 rounded-sm bg-[#dfdfdf] px-8 py-6"
    >
      <h2
        id="room-details-title"
        className="mb-4 text-center text-[26px] font-medium text-[#5b1d14]"
      >
        Your Booking Details
      </h2>

      {/* header bar */}
      <div
        role="row"
        className="grid grid-cols-7 bg-[#4b0d0d] py-3 text-[18px] font-medium text-white"
      >
        <div role="columnheader" className="text-center">
          Booking Type
        </div>
        <div role="columnheader" className="text-center">
          Booking Date
        </div>
        <div role="columnheader" className="text-center">
          Reservation Date
        </div>
        <div role="columnheader" className="text-center">
          Status
        </div>
        <div role="columnheader" className="text-center">
          Total Amount 
        </div>
        <div role="columnheader" className="text-center">
          View Bill
        </div>
        <div role="columnheader" className="text-center">
          Add a Review
        </div>
      </div>

      {/* rows */}
      <div
        role="table"
        className="mt-3 space-y-3"
      >
        {data.map((data,index) => (
          <CustomerBookingRow key={index} data={data} />
        ))}
      </div>
    </section>
  );
}