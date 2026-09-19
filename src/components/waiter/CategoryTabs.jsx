const tabs = ["STARTERS", "MAIN COURSE", "FAST FOOD", "DESSERTS", "DRINKS"];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-10 text-[14px] font-medium text-[#4b0d0d]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`tracking-wide ${
              active === tab ? "font-semibold" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-2 h-[2px] w-full bg-[#4b0d0d]" />
    </div>
  );
}