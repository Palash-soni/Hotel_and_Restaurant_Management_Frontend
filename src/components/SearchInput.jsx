import { Search } from "lucide-react";

export default function SearchInput({ placeholder }) {
  return (
    <div className="relative w-full sm:w-72">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-4 pr-10 py-2 rounded-full border border-[#5b0f0f] bg-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#5b0f0f]"
      />
      <Search
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}