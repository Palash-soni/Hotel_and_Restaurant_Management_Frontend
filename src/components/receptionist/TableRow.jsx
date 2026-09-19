import { useEffect, useState } from "react";

export default function TableRow({data}) {

  return (
    <div className=" grid grid-cols-5 items-center h-[54px] bg-white px-6">
      <div>{data.userName}</div>
      <div>{data.number}</div>
      <div>{data.tableID}</div>
      <div>{data.bookingDate}</div>
      <div>{data.bookingTime}</div>
    </div>
  );
}