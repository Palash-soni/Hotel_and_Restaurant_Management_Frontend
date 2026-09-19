export default function AvailabilityCard({ number, label }) {
  return (
    <div className="bg-[#e9e9e9] rounded-3xl p-6 flex items-center gap-6">
      <span className="text-5xl font-bold text-[#5b0f0f]">{number}</span>
      <span className="text-xl text-[#5b0f0f]">{label}</span>
    </div>
  );
}