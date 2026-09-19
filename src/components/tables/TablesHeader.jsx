export default function TablesHeader({ onAdd }) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-[36px] font-semibold text-[#5b1d14]">
        Tables
      </h1>

      <button
        onClick={onAdd}
        className="rounded-full bg-[#5b1d14] px-7 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5b1d14]"
      >
        Add New Table
      </button>
    </header>
  );
}