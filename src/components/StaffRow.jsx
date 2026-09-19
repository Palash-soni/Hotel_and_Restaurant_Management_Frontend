import React from "react";

export default function StaffRow({ num, staff, user, onStatusToggle }) {
  const s = staff || user || {};
  const index = num !== undefined ? num : 0;

  const joinDate = s.createdAt
    ? new Date(s.createdAt).toISOString().slice(0, 10)
    : "N/A";

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 transition text-sm">
      <td className="py-3 px-4 font-mono font-medium">{index + 1}</td>
      <td className="py-3 px-4 font-medium text-gray-800">{s.name || "N/A"}</td>
      <td className="py-3 px-4 text-gray-600 font-mono">{s.number || "N/A"}</td>
      <td className="py-3 px-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-[#5b0f0f]">
          {s.role || "Staff"}
        </span>
      </td>
      <td className="py-3 px-4 text-gray-600">{joinDate}</td>
      <td className="py-3 px-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            s.isActive
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {s.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="py-3 px-4 text-center">
        <button
          onClick={() => onStatusToggle && onStatusToggle(s)}
          className="cursor-pointer text-xs font-medium px-3 py-1 rounded bg-gray-200 hover:bg-[#5b0f0f] hover:text-white transition shadow-sm"
        >
          {s.isActive ? "Deactivate" : "Activate"}
        </button>
      </td>
    </tr>
  );
}