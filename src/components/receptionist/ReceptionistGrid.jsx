import { Link } from "react-router-dom";
import ActionButton from "./ActionButton";

export default function ReceptionistGrid() {
  return (
    <section
      aria-label="Receptionist actions"
      className="mx-auto max-w-[1200px]"
    >
      <div className="grid grid-cols-1 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/Receptionist/NewRoom" ><ActionButton label="New Room Booking" /></Link>
        <Link to="/Receptionist/CurrentRoomBookings" ><ActionButton label="Current Room Bookings" /></Link>
       <Link to="/Receptionist/PreviousRoomBookings" ><ActionButton label="Previous Room Bookings" /></Link> 

       <Link to="/Receptionist/NewTableBookings" ><ActionButton label="New Table Booking" /></Link> 
       <Link to="/Receptionist/CurrentTableBookings" > <ActionButton label="Current Table Bookings" /></Link> 
        {/* <ActionButton label="New Table Booking" /> */}
       
       <Link to="/Receptionist/AssignWaiters" ><ActionButton label="Assign Waiter" /></Link> 
      </div>
    </section>
  );
}