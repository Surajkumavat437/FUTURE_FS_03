import api from "./api";

export const createReservation = async (reservationData) => {
  try {
    const response = await api.post("/reservations", reservationData);
    console.log("Reservation secured successfully");
    return response.data;

  } catch (error) {

    const errorMessage = error.response?.data?.message || "Internal Server Error";
    console.error("Reservation Service Error:", errorMessage);
    throw error;
  }
};
