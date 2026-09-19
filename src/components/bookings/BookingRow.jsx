import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookingRow({ booking,headers }) {

const [tableDisp,setTableDisp] = useState("");
const [roomDisp,setRoomDisp] = useState("");
 const [headerLength, setHeaderLength] = useState(9);
// const [cols,setcols] = useState(9);

  // console.log(headers.length)
  useEffect(()=>{
    setHeaderLength(headers.length);
    if(headers.length==9){
      setTableDisp("hidden");
      // setcols(9);
    }else if(headers.length==7){
      setRoomDisp("hidden");
      // setRoomDisp(7);
    }

   

  },[])

  console.log("BookingRow Rendered");

  return (
    <div
      role="row"
      className={`relative grid grid-cols-${headerLength} items-center bg-white px-6 py-4 text-[15px] text-[#5b1d14]`}
    >
      <div role="cell" className={`text-center ${roomDisp}`}>
        {booking.roomID}
      </div>
      <div role="cell" className={`text-center ${tableDisp}`}>
        {booking.tableID}
      </div>

      <div role="cell" className={`text-center`}>
        {booking.userName}
      </div>

      <div role="cell" className={`text-center ${roomDisp}`}>
        {booking.roomType}
      </div>
      <div role="cell" className={`text-center ${tableDisp}`}>
        {booking.bookingDate}
      </div>

      <div role="cell" className={`text-center ${roomDisp}`}>
        {booking.checkInDate}
      </div>
      <div role="cell" className={`text-center ${tableDisp}`}>
        {booking.bookingTime}
      </div>


      <div role="cell" className={`text-center ${roomDisp}`}>
        {booking.checkOutDate}
      </div>
      <div role="cell" className={`text-center ${tableDisp}`}>
        {booking.status}
      </div>

      <div role="cell" className={`text-center ${roomDisp}`}>
        {booking.totalAmount}
      </div>

      <div role="cell" className={`text-center ${roomDisp}`}>
        {booking.status}
      </div>

      <div role="cell" className={`text-center`}>
        {booking.createdAt.slice(0,10)}
      </div>




      {/* <div role="cell" className={`text-center`}>
        {booking.BookingDate}
      </div> */}

      

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 gap-4 text-white text-center" >
       <button
          aria-label="Edit room"
          className="rounded p-1 hover:bg-[#a13828] bg-[#5b1d14] cursor-pointer"
        >
          <Pencil size={18} />
        </button>

        <button
          aria-label="Delete room"
          className="rounded p-1 hover:bg-[#a13828] bg-[#5b1d14] cursor-pointer"
          onClick={()=>{handleClick()}}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}