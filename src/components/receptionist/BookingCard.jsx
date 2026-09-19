import BookingForm from "./BookingForm";

export default function BookingCard() {
  return (
    <section
      aria-labelledby="book-new-room"
      className="mx-auto w-full max-w-[980px] bg-[#dedede] px-10 py-10 md:px-14 md:py-12"
    >
      <h2
        id="book-new-room"
        className="mb-12 text-center text-[26px] font-medium text-[#4b0d0d]"
      >
        Book New Room
      </h2>

      <BookingForm />
    </section>
  );
}