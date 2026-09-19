import RoomRow from "./RoomRow";

export default function RoomsTable({ rooms }) {
  return (
    <section
      aria-labelledby="room-details-title"
      className="mt-10 rounded-sm bg-[#dfdfdf] px-8 py-6"
    >
      <h2
        id="room-details-title"
        className="mb-4 text-center text-[26px] font-medium text-[#5b1d14]"
      >
        Room Details
      </h2>

      {/* header bar */}
      <div
        role="row"
        className="grid grid-cols-7 bg-[#4b0d0d] py-3 text-[18px] font-medium text-white"
      >
        <div role="columnheader" className="text-center">
          Room ID
        </div>
        <div role="columnheader" className="text-center">
          Room Type
        </div>
        <div role="columnheader" className="text-center">
          Price
        </div>
        <div role="columnheader" className="text-center">
          Capacity
        </div>
        <div role="columnheader" className="text-center">
          Description
        </div>
        <div role="columnheader" className="text-center">
          Status
        </div>
        <div role="columnheader" className="text-center">
          Actions
        </div>
      </div>

      {/* rows */}
      <div
        role="table"
        className="mt-3 space-y-3"
      >
        {rooms.map((room) => (
          <RoomRow key={room.roomID} room={room} />
        ))}
      </div>
    </section>
  );
}