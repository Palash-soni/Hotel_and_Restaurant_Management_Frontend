import { Trash2 } from "lucide-react";
import apiClient from "../../api/apiClient";

export default function MenuCard({ item }) {
  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete ${item.title}?`)) return;

    apiClient
      .post("menuItem/delete", { id: item.id })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting menu item:", error);
        alert("Failed to delete menu item.");
      });
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-4 shadow-md border border-gray-100 overflow-hidden">
      <div>
        <img
          src={item.imageURL || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"}
          alt={item.title}
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-[#5b1d14]">{item.title}</h3>
          <span className="font-bold text-green-700">₹{item.price}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
      </div>

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
        <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 rounded">
          {item.category}
        </span>
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete menu item"
          className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}