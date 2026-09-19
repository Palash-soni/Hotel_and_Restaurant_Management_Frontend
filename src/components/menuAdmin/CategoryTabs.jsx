export default function CategoryTabs({
  categories,
  active,
  onChange,
}) {
  return (
    <nav
      aria-label="Menu categories"
      className="mt-8 border-b border-[#7a4a2d] "
    >
      <ul className="flex flex-wrap gap-8 text-[15px] font-medium tracking-wider text-[#6b3a1f]">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onChange(cat)}
              className={`pb-2 transition-colors cursor-pointer ${
                active === cat
                  ? "border-b-2 border-[#6b3a1f] text-[#6b3a1f]"
                  : "text-[#6b3a1f]/80 hover:text-[#6b3a1f]"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}