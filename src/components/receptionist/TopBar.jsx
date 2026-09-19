import { LogOut } from "lucide-react";
import apiClient from "../../api/apiClient";

export default function TopBar() {
  const role = localStorage.getItem("role") || "Receptionist";
  const number = localStorage.getItem("number");
  const name = localStorage.getItem("name") || "Receptionist";

  const handleLogout = () => {
    if (number) {
      apiClient
        .get(`allUsers/setStatus?status=I&id=${number}`)
        .catch((err) => console.log(err))
        .finally(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("number");
          localStorage.removeItem("name");
          window.location.href = "/Login";
        });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("number");
      localStorage.removeItem("name");
      window.location.href = "/Login";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 px-6 pt-4">
      <div>
        <h1 className="text-2xl font-bold text-[#5b0f0f]">Reception Desk</h1>
        <p className="text-sm text-gray-500">Logged in as: {name}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="px-3 py-1 bg-amber-100 text-[#5b0f0f] rounded-full text-xs font-semibold uppercase">
          {role}
        </span>
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="flex items-center gap-2 bg-[#5b0f0f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4a0c0c] transition cursor-pointer shadow-sm"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}