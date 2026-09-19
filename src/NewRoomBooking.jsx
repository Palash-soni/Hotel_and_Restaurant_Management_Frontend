import BookingCard from "./components/receptionist/BookingCard";

export default function NewRoomBooking() {
  return (
    <main className="flex flex-1 flex-col px-6 pb-16">
      <h1 className="mt-12 mb-10 text-center text-[48px] font-semibold text-[#4b0d0d]">
        Receptionist
      </h1>

      <BookingCard />
    </main>
  );
}