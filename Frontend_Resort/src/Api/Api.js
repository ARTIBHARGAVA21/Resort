import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: normalize star input (3 / "3" / "3-star" → "3-star")
const normalizeStar = (stars) => {
  if (typeof stars === "number" || /^[0-9]+$/.test(stars)) {
    return `${stars}-star`;
  }
  return stars; // assume already like "3-star" / "4-star" / "5-star"
};

const api = {
  // -------- Hotels (All) --------
  getAllHotels: () => apiClient.get("/all-hotels/"),                 // GET all hotels
  getHotelById: (id) => apiClient.get(`/all-hotels/${id}/`),         // GET hotel by ID

  createHotel: (data) => apiClient.post("/all-hotels/", data),       // POST new hotel
  updateHotel: (id, data) => apiClient.put(`/all-hotels/${id}/`, data), // PUT update hotel
  deleteHotel: (id) => apiClient.delete(`/all-hotels/${id}/`),       // DELETE hotel

  // -------- 5-Star Hotels --------
  getFiveStarHotels: () => apiClient.get("/hotels/5-star/"),
  getFiveStarHotelById: (id) => apiClient.get(`/hotels/5-star/${id}/`),

  // -------- 4-Star Hotels --------
  getFourStarHotels: () => apiClient.get("/hotels/4-star/"),
  getFourStarHotelById: (id) => apiClient.get(`/hotels/4-star/${id}/`),

  // -------- 3-Star Hotels --------
  getThreeStarHotels: () => apiClient.get("/hotels/3-star/"),
  getThreeStarHotelById: (id) => apiClient.get(`/hotels/3-star/${id}/`),

  // -------- Rooms (by Hotel & Star) --------
  // stars: 3 | 4 | 5 | "3" | "4" | "5" | "3-star" | "4-star" | "5-star"
  getRoomsByHotel: (hotelId, stars) => {
    const starPath = normalizeStar(stars);
    return apiClient.get(`/hotels/${starPath}/${hotelId}/rooms/`);
  },

  getRoomById: (hotelId, roomId, stars) => {
    const starPath = normalizeStar(stars);
    return apiClient.get(`/hotels/${starPath}/${hotelId}/rooms/${roomId}/`);
  },

  // -------- Search --------
  searchHotels: (query) => apiClient.get(`/search/?q=${encodeURIComponent(query)}`),

  // -------- Booking --------
  bookResort: (data) => apiClient.post("/book-resort/", data),

  // -------- Generic: Hotel details by star + id --------
  // star should be "5-star" | "4-star" | "3-star" (or 5/4/3, handled by normalizeStar)
  getHotelDetailsByStarAndId: async (star, id) => {
    const starPath = normalizeStar(star);
    const response = await apiClient.get(`/hotels/${starPath}/${id}/`);
    return response;
  },

  // -------- Hotel Map URL --------
  // Matches: path('hotels/<int:id>/map/', HotelMapLinkAPIView.as_view(), ...)
  getHotelMapUrlById: async (id) => {
    const response = await apiClient.get(`/hotels/${id}/map/`);
    // assuming the API returns { map_url: "https://..." }
    return response.data.map_url;
  },
};

export default api;
