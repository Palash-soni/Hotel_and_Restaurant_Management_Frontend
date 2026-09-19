export default function BookingTabs({ active, onChange }) {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-12">
      <button
        onClick={() => onChange("room")}
        className={`rounded-xl px-10 py-3 text-sm font-semibold text-white transition
          ${
            active === "room"
              ? "bg-[#4b0d0d]"
              : "bg-[#4b0d0d]/80 hover:bg-[#4b0d0d]"
          }`}
      >
        Room Bookings
      </button>

      <button
        onClick={() => onChange("table")}
        className={`rounded-xl px-10 py-3 text-sm font-semibold text-white transition
          ${
            active === "table"
              ? "bg-[#4b0d0d]"
              : "bg-[#4b0d0d]/80 hover:bg-[#4b0d0d]"
          }`}
      >
        Table Bookings
      </button>
    </div>
  );
}