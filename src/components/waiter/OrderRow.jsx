import React, { useState } from "react";

export default function OrderRow({ order }) {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="text-center text-lg h-12 bg-white ">
        <td className="py-4">{order.tableID}</td>

        {/* <td className="py-4">
          <select
            className="border border-[#8a5a54] px-3 py-1 rounded-sm text-sm focus:outline-none"
            onChange={(e) => setOpen(e.target.value === "open")}
          >
            <option value="">See Food Items</option>
            <option value="open">Open</option>
          </select>
        </td> */}

        <td className="py-4">{order.bookingTime}</td>

        {/* <td className="py-4 text-sm">
          {order.bookingTime}
        </td> */}
      </tr>

      {/* {open && (
        <tr>
          <td colSpan={4} className="px-6 pb-4">
            <div className="border border-[#d1d1d1] bg-white p-4 text-left text-sm">
              <ul className="list-disc pl-5 space-y-1">
                {order.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      )} */}
    </>
  );
}