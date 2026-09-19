import { useEffect, useState } from "react";
import FormField from "../receptionist/FormField";
import Loader from "../Loader";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function AddMenuItem() {
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: 0,
    imageURL: "",
    description: "",
    category: "",
  });

  const [itemID, setItemID] = useState(1);

  useEffect(() => {
    apiClient
      .get("menuItem")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const maxId = response.data.reduce((max, item) => {
            const num = Number(item.id);
            return !isNaN(num) && num > max ? num : max;
          }, 0);
          setItemID(maxId + 1);
        } else {
          setItemID(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: itemID,
      title: form.title,
      price: Number(form.price),
      imageURL: form.imageURL,
      description: form.description,
      category: form.category,
      status: "Available",
    };

    try {
      setVis(true);
      await apiClient.post("menuItem/add", payload);
      navigate("/Admin/Menu");
    } catch (error) {
      setVis(false);
      console.error("Error adding menu item:", error);
      alert(error.response?.data?.message || "Error adding menu item.");
    }
  };

  const inputClass =
    "h-[44px] w-full rounded-sm border border-transparent bg-white px-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#4b0d0d]";

  return (
    <div className="py-16 w-full">
      <section
        aria-labelledby="book-new-room"
        className="mx-auto w-full max-w-[980px] bg-[#dedede] px-10 py-10 md:px-14 md:py-10 shadow-lg rounded-xl"
      >
        <h2
          id="book-new-room"
          className="mb-12 text-center text-[26px] font-medium text-[#4b0d0d]"
        >
          Add New Menu Item
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-x-16 gap-y-5 md:grid-cols-2"
        >
          <FormField label="ID :">
            <input
              name="id"
              value={itemID}
              onChange={handleChange}
              className={inputClass}
              type="text"
              disabled={true}
            />
          </FormField>

          <FormField label="Category :">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputClass} pr-8`}
              required
            >
              <option value="">Select Category</option>
              <option value="STARTERS">STARTERS</option>
              <option value="MAIN COURSE">MAIN COURSE</option>
              <option value="FAST FOOD">FAST FOOD</option>
              <option value="DESSERTS">DESSERTS</option>
              <option value="DRINKS">DRINKS</option>
            </select>
          </FormField>

          <FormField label="Name :">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              type="text"
              required
            />
          </FormField>

          <FormField label="Price :">
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className={inputClass}
              type="number"
              required
            />
          </FormField>

          <FormField label="Image URL :">
            <input
              name="imageURL"
              value={form.imageURL}
              onChange={handleChange}
              className={inputClass}
              type="text"
            />
          </FormField>

          <FormField label="Description :">
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
              type="text"
            />
          </FormField>

          <div className="md:col-span-2 flex justify-center pt-8">
            <button
              type="submit"
              className="h-[46px] w-[220px] cursor-pointer bg-[#4b0d0d] text-[20px] font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4b0d0d] rounded"
            >
              Add Item
            </button>
          </div>
        </form>
      </section>
      <Loader vis={vis} />
    </div>
  );
}
