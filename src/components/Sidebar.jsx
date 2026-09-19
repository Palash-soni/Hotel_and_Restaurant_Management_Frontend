import {
  LayoutDashboard,
  Users,
  UserCog,
  Utensils,
  BedDouble,
  Table,
  CalendarCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Staff", icon: UserCog },
    { name: "Menu", icon: Utensils },
    { name: "Rooms", icon: BedDouble },
    { name: "Table", icon: Table },
    { name: "Bookings", icon: CalendarCheck },
    { name: "Reviews", icon: Star },
  ];

  return (
    <aside className="w-64 h-screen bg-[#e9e9e9] min-h-screen px-6 py-8 hidden md:block sticky top-0">
      <h1 className="text-2xl font-bold text-[#5b0f0f] mb-10">Innovo Hotels</h1>

      <nav className="space-y-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          let url = `/Admin/${item.name}`;
          return (
            <Link
              to={url}
              key={index}
              className="flex items-center gap-3 text-[#5b0f0f] hover:text-black cursor-pointer"
            >
              <Icon size={20} />
              <span className="text-base">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
