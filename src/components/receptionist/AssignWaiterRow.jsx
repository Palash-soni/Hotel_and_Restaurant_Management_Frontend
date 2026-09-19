import { Check } from "lucide-react";
import EditIcon from "./EditIcon";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AssignWaiterRow({ data }) {
  const [activeWaiters, setActiveWaiters] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState("None");
  const [icon, setIcon] = useState(true);

  useEffect(() => {
    setSelectedWaiter(data.assignedWaiter || "None");
    apiClient
      .get("allUsers/active")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setActiveWaiters(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching active waiters:", error);
      });
  }, [data]);

  const changeWaiter = () => {
    apiClient
      .post("createTableBooking/assignWaiter", {
        id: data._id,
        assignedWaiter: selectedWaiter,
      })
      .then((response) => {
        setIcon(true);
      })
      .catch((error) => {
        console.error("Error assigning waiter:", error);
        alert("Failed to assign waiter.");
      });
  };

  return (
    <div className="grid grid-cols-4 items-center h-[54px] px-8 text-base bg-white border-b border-gray-200">
      <div className="font-semibold text-[#5b1d14]">{data.tableID}</div>

      <div className="text-center">{data.bookingTime}</div>

      <div className="text-center">
        {icon ? (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              selectedWaiter === "None"
                ? "bg-gray-100 text-gray-600"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {selectedWaiter}
          </span>
        ) : (
          <select
            name="waiterName"
            value={selectedWaiter}
            onChange={(e) => setSelectedWaiter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
          >
            <option value="None">None</option>
            {activeWaiters.map((waiterData, index) => (
              <option value={waiterData.name} key={index}>
                {waiterData.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          aria-label="Edit waiter"
          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#4b0d0d] text-white hover:bg-[#681818] transition"
          onClick={() => {
            if (icon) {
              setIcon(false);
            } else {
              changeWaiter();
            }
          }}
        >
          {icon ? <EditIcon /> : <Check size={16} />}
        </button>
      </div>
    </div>
  );
}
