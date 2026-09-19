export default function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[22px] font-medium text-[#4b0d0d]">
        {label}
      </label>
      {children}
    </div>
  );
}