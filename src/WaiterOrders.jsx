import React, { useEffect, useState } from "react";
import PageHeader from "./components/waiter/PageHeader";
import OrdersTable from "./components/waiter/OrdersTable";
import Container from "./components/waiter/Container";
import apiClient from "./api/apiClient";

export default function WaiterOrders() {
  const [orders, setOrders] = useState([]);
  const waiterName = localStorage.getItem("name") || "";

  useEffect(() => {
    if (waiterName) {
      apiClient
        .get(`allTableBookings/waiter?name=${encodeURIComponent(waiterName)}`)
        .then((response) => {
          setOrders(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          console.error("Error fetching waiter bookings:", error);
        });
    }
  }, [waiterName]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <PageHeader />

        <Container>
          <OrdersTable orders={orders} />
        </Container>
      </main>
    </div>
  );
}