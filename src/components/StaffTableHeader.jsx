export default function StaffTableHeader() {
  return (
    <thead>
      <tr className="bg-[#5b0f0f] text-white text-sm md:text-base">
        <th className="py-3 px-4 text-left font-semibold">#</th>
        <th className="py-3 px-4 text-left font-semibold">Name</th>
        <th className="py-3 px-4 text-left font-semibold">Contact</th>
        <th className="py-3 px-4 text-left font-semibold">Role</th>
        <th className="py-3 px-4 text-left font-semibold">Joining Date</th>
        <th className="py-3 px-4 text-left font-semibold">Status</th>
        <th className="py-3 px-4 text-center font-semibold">Action</th>
      </tr>
    </thead>
  );
}