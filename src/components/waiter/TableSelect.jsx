import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function TableSelect({ selectedTable, handleTableChange }) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    apiClient
      .get("allTables")
      .then((res) => {
        setTables(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Error fetching tables for order:", err));
  }, []);

  return (
    <div className="flex items-center gap-4">
      <label className="text-[18px] font-semibold text-[#4b0d0d]">Select Table :</label>

      <select
        value={selectedTable}
        onChange={handleTableChange}
        className="h-[40px] px-3 bg-white rounded border border-gray-300 outline-none text-[16px] font-medium"
      >
        <option value="">-- Choose Table --</option>
        {tables.map((table) => (
          <option key={table._id || table.tableID} value={table.tableID}>
            Table {table.tableID} ({table.status || "Available"})
          </option>
        ))}
      </select>
    </div>
  );
}