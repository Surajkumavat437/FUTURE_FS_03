import api from "./api";

export const getMenuItems = async (category) => {
  try {
    const response = await api.get("/menu", {
      params: category ? { category } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error.message);
    throw error;
  }
};
