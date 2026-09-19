import React from "react";
import OrderRow from "./OrderRow";

export default function OrdersTable({ orders }) {
  return (
    <section
      aria-label="Your current orders"
      className="bg-[#dfdfdf] px-6 py-6 md:px-10 md:py-8"
    >
      <h2 className="text-center text-[#5b1a14] text-xl font-medium mb-4">
        Your Today's Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#4b0f0c] text-white text-lg">
              <th className="py-3 font-medium">Table No.</th>
              {/* <th className="py-3 font-medium">Food Items</th> */}
              <th className="py-3 font-medium">Time Slot</th>
              {/* <th className="py-3 font-medium">Status</th> */}
            </tr>
          </thead>

          <tbody className="bg-[#dfdfdf]">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}

            {/* Empty visual rows (as in design) */}
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td colSpan={4} className="py-6">
                  <div className="h-12 bg-white w-full"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}