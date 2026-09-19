import { useEffect, useState } from "react";
import MenuHeader from "./components/menuAdmin/MenuHeader";
import CategoryTabs from "./components/menuAdmin/CategoryTabs";
import MenuGrid from "./components/menuAdmin/MenuGrid";
import Loader from "./components/Loader";
import apiClient from "./api/apiClient";

export default function Menu() {
  const categories = [
    "STARTERS",
    "MAIN COURSE",
    "FAST FOOD",
    "DESSERTS",
    "DRINKS",
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuItems, setMenuItems] = useState([]);
  const [vis, setVis] = useState(true);

  useEffect(() => {
    setVis(false);
    apiClient
      .get("menuItem")
      .then((response) => {
        setMenuItems(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const filtered = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <main className="w-full px-6 py-6 lg:px-10 lg:py-8">
      <MenuHeader />

      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <MenuGrid items={filtered} />
      <Loader vis={vis} />
    </main>
  );
}