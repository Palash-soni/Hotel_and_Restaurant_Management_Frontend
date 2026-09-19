import MenuCard from "./MenuCard";

export default function MenuGrid({ items }) {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}