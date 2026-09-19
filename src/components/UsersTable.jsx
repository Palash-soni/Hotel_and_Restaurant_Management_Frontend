import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import UserRow from "./UserRow";
import apiClient from "../api/apiClient";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("allUsers?role=Customer")
      .then((response) => {
        setUsers(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching customer users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-[#e5e5e5] p-6 shadow-sm">
      <div className="overflow-x-auto rounded-xl bg-white shadow-inner">
        <table className="w-full text-left border-collapse">
          <TableHeader title="All Users" />
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500 font-medium">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500 font-medium">
                  No customers found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <UserRow
                  key={user._id || user.number || index}
                  num={index}
                  user={user}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
