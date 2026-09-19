import { Link } from "react-router-dom";

export default function RoomsHeader() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-[36px] font-semibold text-[#5b1d14]">
        Rooms
      </h1>


     <Link to="Add"><button
       
        className="rounded-full bg-[#5b1d14] px-7 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5b1d14]"
      >
        Add New Room
      </button>
      </Link> 
    </header>
  );
}