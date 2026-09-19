export default function StatCard({ number, label,data }) {
  return (
    <div className="bg-[#e9e9e9] rounded-3xl p-8 text-center">
      <h3 className="text-6xl font-bold text-[#5b0f0f]">{data}</h3>
      <p className="mt-4 text-lg text-[#5b0f0f]">{label}</p>
    </div>
  );
}