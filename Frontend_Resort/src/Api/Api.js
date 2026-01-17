import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://13.53.37.121/api",
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

const normalizeStar = (stars) => {
  if (typeof stars === "number" || /^[0-9]+$/.test(String(stars))) {
    return `${stars}-star`;
  }
  return String(stars);
};

const api = {
  // NEW (generic)
  getHotelsByStar: (star) => apiClient.get(`hotels/${normalizeStar(star)}/`),
  getHotelByStarAndId: (star, id) =>
    apiClient.get(`hotels/${normalizeStar(star)}/${id}/`),

  // OLD (aliases so your existing UI doesn't break)
  getFiveStarHotels: () => apiClient.get(`hotels/5-star/`),
  getFourStarHotels: () => apiClient.get(`hotels/4-star/`),
  getThreeStarHotels: () => apiClient.get(`hotels/3-star/`),

  getFiveStarHotelById: (id) => apiClient.get(`hotels/5-star/${id}/`),
  getFourStarHotelById: (id) => apiClient.get(`hotels/4-star/${id}/`),
  getThreeStarHotelById: (id) => apiClient.get(`hotels/3-star/${id}/`),

  // Grouped
  getGroupedHotels: () => apiClient.get("hotels/"),

  // Rooms
  getRoomsByHotel: (hotelId) => apiClient.get(`hotels/${hotelId}/rooms/`),
  getRoomById: (hotelId, roomId) =>
    apiClient.get(`hotels/${hotelId}/rooms/${roomId}/`),

  // Search
  searchHotels: (query) =>
    apiClient.get(`search/?q=${encodeURIComponent(query)}`),

  // Booking
  createBooking: (data) => apiClient.post("booking/", data),

  // Map
  getHotelMapUrlById: async (id) => {
    const res = await apiClient.get(`map/${id}/`);
    return res.data.map_url;
  },
};

export default api;
