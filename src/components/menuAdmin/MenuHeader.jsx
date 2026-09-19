import { Link } from "react-router-dom";

export default function MenuHeader() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-[32px] font-semibold text-[#5b1d14] tracking-wide">
        Menu
      </h1>

<Link to="Add">
      <button
        className="rounded-full cursor-pointer bg-[#5b1d14] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5b1d14]"
        >
        Add New Item
      </button>
        </Link>
    </header>
  );
}