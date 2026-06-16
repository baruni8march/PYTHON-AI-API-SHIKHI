import apiClient from "./apiClient";

export const getProfile = async () => {
  const response = await apiClient.get("/profile/me");
  return response.data.data;
};

export const getDashboardSummary = async () => {
  const response = await apiClient.get("/dashboard/summary");
  return response.data.data;
};

export const getReports = async () => {
  const response = await apiClient.get("/reports");
  return response.data.data;
};