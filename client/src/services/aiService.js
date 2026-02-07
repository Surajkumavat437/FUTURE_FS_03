import api from "./api";

export const getAIRecommendation = async (message) => {
  try {
    const response = await api.post("/ai/menu", { message });
    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error.response?.data || error.message);
    throw error;
  }
};