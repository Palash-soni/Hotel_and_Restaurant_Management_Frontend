export default function ActionButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-[86px] w-[360px] items-center justify-center rounded-full bg-[#4b0d0d]
                 text-[28px] font-semibold text-white transition
                 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4b0d0d] focus:ring-offset-2"
    >
      {children}
    </button>
  );
}