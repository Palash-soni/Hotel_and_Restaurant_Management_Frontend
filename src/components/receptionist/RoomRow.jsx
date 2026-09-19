import { useEffect, useState } from "react";

export default function RoomRow({ data }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    var currDate = new Date();
    var checkInDate = new Date(data.checkInDate);
    var checkOutDate = new Date(data.checkOutDate);

    if (checkInDate > currDate) {
      setStatus("Yet To Check In");
    } else if (checkOutDate > currDate) {
      setStatus("Checked In");
    } else {
      setStatus("Checked Out");
    }
  }, []);

  return (
    <div className="grid grid-cols-4 items-center h-[54px] bg-white px-6">
      <div>{data.userName}</div>
      <div>{data.number}</div>
      <div>{data.roomID}</div>
      <div>{status}</div>
    </div>
  );
}
