import apiClient from "./apiClient";

export const getDashboardData = async () => {
  const res = await apiClient.get("api/dashboard");
  return res.data;
};