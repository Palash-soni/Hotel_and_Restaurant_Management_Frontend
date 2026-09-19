export default function FoodCard({ item, onAdd }) {
  return (
    <article className="flex flex-col items-center">
      <div className="relative border-2 border-[#4b0d0d]">
        <img
          src={item.imageURL}
          alt={item.title}
          className="h-[160px] w-[200px] object-cover"
        />

        <button
          onClick={onAdd}
          aria-label="Add item"
          className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-lg font-bold text-black"
        >
          +
        </button>
      </div>

      <h3 className="mt-2 text-[18px] text-[#4b0d0d]">
        {item.title}
      </h3>

      <p className="mt-1 max-w-[200px] text-center text-[11px] text-gray-700">
        {item.description}
      </p>

      <div className="mt-2 bg-[#4b0d0d] px-4 py-[2px] text-white">
        Rs. {item.price}/-
      </div>
    </article>
  );
}