export default function ChartCard({ children, className }) {
  return (
    <div
      className={`bg-white rounded-3xl border border-[#5b0f0f] p-6 px-0 ${className}`}
    >
      {children}
    </div>
  );
}