import FoodCard from "./FoodCard";

export default function FoodGrid({ items , handleAddItem }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <FoodCard
          key={item.id}
          item={item}
          onAdd={() => {
            handleAddItem(item)
          }}
        />
      ))}
    </div>
  );
}