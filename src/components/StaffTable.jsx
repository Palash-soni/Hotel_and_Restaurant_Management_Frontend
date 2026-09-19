import { useEffect, useState } from "react";
import StaffTableHeader from "./StaffTableHeader";
import StaffRow from "./StaffRow";
import apiClient from "../api/apiClient";

export default function StaffTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStaff = () => {
    setLoading(true);
    apiClient
      .get("allUsers?role=Staff")
      .then((response) => {
        setUsers(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching staff users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleToggleStatus = async (staffMember) => {
    try {
      const newStatus = staffMember.isActive ? "I" : "A";
      await apiClient.get(
        `allUsers/setStatus?status=${newStatus}&id=${staffMember.number}`
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.number === staffMember.number
            ? { ...u, isActive: !staffMember.isActive }
            : u
        )
      );
    } catch (err) {
      console.error("Error toggling staff status:", err);
      alert("Failed to update staff status.");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.number && u.number.includes(q)) ||
      (u.role && u.role.toLowerCase().includes(q))
    );
  });

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-[#e5e5e5] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-bold text-[#5b0f0f]">
          All Staff ({filteredUsers.length})
        </h2>
        <input
          type="text"
          placeholder="Search by name, role, contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 text-sm rounded-lg bg-white text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-[#5b0f0f]"
        />
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-inner">
        <table className="w-full text-left border-collapse">
          <StaffTableHeader />
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500 font-medium">
                  Loading staff members...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500 font-medium">
                  No staff members found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <StaffRow
                  key={user._id || user.number || index}
                  num={index}
                  staff={user}
                  user={user}
                  onStatusToggle={handleToggleStatus}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}