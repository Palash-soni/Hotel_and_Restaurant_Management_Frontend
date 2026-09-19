import apiClient from "../api/apiClient";

export const addItemToOrder = (data) =>
  apiClient.post("api/orders/add-item", data);

export const getTableOrder = (tableNo) =>
  apiClient.get(`api/orders/table/${tableNo}`);

export const completeOrder = (orderId) =>
  apiClient.post("api/orders/complete", { orderId });