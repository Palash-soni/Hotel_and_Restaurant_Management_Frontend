import { Check, EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function TableRow({ table }) {
  const [icon, setIcon] = useState(true);
  const [activeStatus, setActiveStatus] = useState("Available");

  useEffect(() => {
    setActiveStatus(table.status || "Available");
  }, [table]);

  const changeStatus = (newStatus) => {
    const statusToSet = newStatus || activeStatus;
    const statusCode = statusToSet === "Booked" ? "B" : statusToSet === "Unavailable" ? "U" : "A";

    apiClient
      .get(`allTables/update?status=${statusCode}&id=${table.tableID}`)
      .then(() => {
        setIcon(true);
      })
      .catch((error) => {
        console.error("Error updating table status:", error);
      });
  };

  return (
    <div
      role="row"
      className="relative grid grid-cols-3 items-center bg-white px-6 py-4 text-[15px] text-[#5b1d14] border-b border-gray-100"
    >
      <div role="cell" className="text-center font-bold">
        {table.tableID}
      </div>

      <div role="cell" className="text-center">
        {icon ? (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              activeStatus === "Available"
                ? "bg-green-100 text-green-800"
                : activeStatus === "Booked"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {activeStatus}
          </span>
        ) : (
          <select
            name="Status"
            value={activeStatus}
            onChange={(e) => {
              setActiveStatus(e.target.value);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 text-white pr-4">
        <button
          type="button"
          aria-label="Edit table"
          className="rounded-full p-2 hover:bg-[#a13828] bg-[#5b1d14] cursor-pointer transition shadow-sm"
          onClick={() => {
            if (icon) {
              setIcon(false);
            } else {
              changeStatus();
            }
          }}
        >
          {icon ? <EditIcon size={16} /> : <Check size={16} color="white" />}
        </button>
      </div>
    </div>
  );
}