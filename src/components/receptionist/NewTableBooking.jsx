import React from 'react'
import BookingForm from './BookingForm'
import TableBookingForm from './TableBookingForm'

const NewTableBooking = () => {
  return (
    <div>
      <section
            aria-labelledby="book-new-room"
            className="mx-auto w-full max-w-[980px] bg-[#dedede] px-10 py-10 md:px-14 md:py-12 mt-10"
          >
            <h2
              id="book-new-room"
              className="mb-12 text-center text-[26px] font-medium text-[#4b0d0d]"
            >
              Book New Table
            </h2>
      
            <TableBookingForm />
          </section>
    </div>
  )
}

export default NewTableBooking
