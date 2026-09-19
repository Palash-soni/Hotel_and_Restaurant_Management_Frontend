import React from "react";

export default function UserRow({ num, user }) {
  const u = user || {};
  const index = num !== undefined ? num : 0;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 transition text-sm">
      <td className="py-3 px-6 font-mono font-medium">{index + 1}</td>
      <td className="py-3 px-6 font-medium text-gray-800">{u.name || "N/A"}</td>
      <td className="py-3 px-6 text-gray-600 font-mono">{u.number || "N/A"}</td>
      <td className="py-3 px-6 text-gray-600">{u.email || "N/A"}</td>
    </tr>
  );
}