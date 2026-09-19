export default function ActionButton({ label }) {
  return (
    <button
      className="
        h-[76px]
        w-full
        max-w-[360px]
        rounded-full
        bg-[#4b0d0d]
        text-[22px]
        font-semibold
        text-white
        shadow-sm
        transition
        hover:opacity-90
        focus:outline-none
        focus:ring-2
        focus:ring-[#4b0d0d]
        focus:ring-offset-2
        px-10
      "
    >
      {label}
    </button>
  );
}