import { useEffect, useState } from "react";
import RoomsHeader from "./components/rooms/RoomsHeader";
import RoomsTable from "./components/rooms/RoomsTable";
import apiClient from "./api/apiClient";

export default function RoomsAdmin() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    apiClient
      .get("allRooms")
      .then((response) => {
        setRooms(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching rooms in admin:", error);
      });
  }, []);

  return (
    <main className="w-full px-8 py-6 lg:px-12">
      <RoomsHeader />
      <RoomsTable rooms={rooms} />
    </main>
  );
}