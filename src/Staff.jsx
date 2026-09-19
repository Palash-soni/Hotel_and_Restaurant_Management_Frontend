// import AdminLayout from "../layout/AdminLayout";
import { Link } from "react-router-dom";
import StaffTable from "./components/StaffTable";

export default function Staff() {
  return (
    <section className="flex-1 p-6 lg:p-8 min-w-0">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-4xl font-bold text-[#5b0f0f]">Staff</h1>
        <Link to="/Admin/Staff/Add">
          <button
            className="rounded-full cursor-pointer bg-[#5b1d14] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5b1d14] transition"
          >
            + Add Staff Member
          </button>
        </Link>
      </div>
      <StaffTable />
    </section>
  );
}
