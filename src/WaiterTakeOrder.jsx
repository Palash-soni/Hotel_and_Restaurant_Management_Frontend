import { useEffect, useState } from "react";
import TableSelect from "./components/waiter/TableSelect";
import CategoryTabs from "./components/waiter/CategoryTabs";
import FoodGrid from "./components/waiter/FoodGrid";
import {
  addItemToOrder,
  getTableOrder,
  completeOrder,
} from "./services/orderService";
import { useNavigate } from "react-router-dom";
import apiClient from "./api/apiClient";

export default function WaiterTakeOrder() {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [activeCategory, setActiveCategory] = useState("STARTERS");

  /* LOAD MENU ITEMS */
  useEffect(() => {
    apiClient
      .get("menuItem")
      .then((res) => {
        setMenuItems(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Error loading menu items:", err));
  }, []);

  /* LOAD ORDER WHEN TABLE CHANGES */
  const handleTableChange = async (e) => {
    const table = e.target.value;
    setSelectedTable(table);

    if (!table) {
      setCurrentOrder(null);
      return;
    }

    try {
      const res = await getTableOrder(table);
      setCurrentOrder(res.data || null);
    } catch (err) {
      console.error("Error fetching table order:", err);
      setCurrentOrder(null);
    }
  };

  /* ADD ITEM → AUTO SAVE */
  const handleAddItem = async (item) => {
    if (!selectedTable) return alert("Please select a table first");

    try {
      await addItemToOrder({
        tableNo: selectedTable,
        menuItemId: item._id,
        quantity: 1,
      });

      const res = await getTableOrder(selectedTable);
      setCurrentOrder(res.data);
    } catch (err) {
      console.error("Error adding item to order:", err);
    }
  };

  /* COMPLETE ORDER → BILL */
  const handleGenerateBill = async () => {
    if (!currentOrder) return;

    try {
      await completeOrder(currentOrder._id);
      navigate("/BillView", {
        state: {
          orderID: currentOrder.items,
          tableId: selectedTable,
          tableID: selectedTable,
          totalAmount: currentOrder.totalAmount,
          amount: currentOrder.totalAmount,
        },
      });
    } catch (err) {
      console.error("Error completing order:", err);
      alert("Error finalizing order.");
    }
  };

  const filtered = menuItems.filter((i) => i.category === activeCategory);

  return (
    <div className="flex flex-col md:flex-row justify-evenly px-6 md:px-10 py-6 gap-8">
      <main className="flex flex-1 flex-col items-center">
        <section className="mt-4 w-full max-w-[900px] bg-[#dedede] px-6 md:px-10 py-6 rounded-2xl shadow-md">
          <h2 className="text-center text-[22px] font-bold text-[#4b0d0d]">Take Order</h2>

          <div className="mt-6">
            <TableSelect
              selectedTable={selectedTable}
              handleTableChange={handleTableChange}
            />
          </div>

          <div className="mt-6">
            <p className="text-[20px] font-semibold text-[#4b0d0d]">Select Food Items :</p>

            <CategoryTabs
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          <FoodGrid items={filtered} handleAddItem={handleAddItem} />
        </section>
      </main>

      {/* Sidebar Order Summary */}
      <div className="w-full md:w-80 pt-4">
        <div className="w-full border border-gray-300 p-5 rounded-2xl bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-3 text-[#5b0f0f]">
            Table: {selectedTable || "None Selected"}
          </h2>

          <hr className="border-gray-200" />

          {!currentOrder || !currentOrder.items || currentOrder.items.length === 0 ? (
            <p className="mt-4 text-gray-500 text-center py-4 text-sm">No running active orders</p>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-2 mt-3">
              {currentOrder.items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <span className="font-medium">
                    {item.name} <span className="text-gray-500">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-[#5b0f0f]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          <hr className="my-4 border-gray-200" />

          <div className="flex justify-between items-center text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span className="text-[#5b0f0f]">₹{currentOrder?.totalAmount || 0}</span>
          </div>

          <button
            onClick={handleGenerateBill}
            className="bg-[#4b0d0d] hover:bg-[#681818] text-white w-full mt-4 py-2.5 rounded-xl font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            disabled={!currentOrder || !currentOrder.items || currentOrder.items.length === 0}
          >
            Generate Bill
          </button>
        </div>
      </div>
    </div>
  );
}
