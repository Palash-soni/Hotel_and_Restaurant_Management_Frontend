import { Check, EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function RoomRow({ room }) {
  const [icon, setIcon] = useState(true);
  const [activeStatus, setActiveStatus] = useState("Available");

  useEffect(() => {
    setActiveStatus(room.status || "Available");
  }, [room]);

  const changeStatus = (newStatus) => {
    const statusToSet = newStatus || activeStatus;
    const statusCode = statusToSet === "Booked" ? "B" : statusToSet === "Unavailable" ? "U" : "A";

    apiClient
      .get(`allRooms/update?status=${statusCode}&id=${room.roomID}`)
      .then(() => {
        setIcon(true);
      })
      .catch((error) => {
        console.error("Error updating room status:", error);
      });
  };

  return (
    <div
      className="relative grid grid-cols-7 items-center bg-white py-4 text-[14px] text-[#5b1d14] border-b border-gray-100"
      role="row"
    >
      <div role="cell" className="text-center font-bold">
        {room.roomID}
      </div>

      <div role="cell" className="text-center font-medium">
        {room.roomType}
      </div>

      <div role="cell" className="text-center font-semibold text-green-700">
        ₹{room.pricePerNight}
      </div>
      <div role="cell" className="text-center">
        {room.capacity}
      </div>
      <div role="cell" className="text-center text-xs text-gray-600 truncate px-2">
        {room.description}
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
            className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        )}
      </div>

      {/* actions */}
      <div className="flex justify-end pr-4 text-white">
        <button
          type="button"
          aria-label="Edit room"
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
