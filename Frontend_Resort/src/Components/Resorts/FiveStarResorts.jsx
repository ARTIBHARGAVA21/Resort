import React, { useEffect, useState } from "react";
import api from "../../Api/Api";
import { Link } from "react-router-dom";
import HotelCard from "../../Utils/HotelCard";

const FiveStarResorts = () => {
  const [fiveStarHotels, setFiveStarHotels] = useState([]); // always keep as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchFiveStarHotels = async () => {
      try {
        if (!mounted) return;

        setLoading(true);
        setError(null);

        const response = await api.getFiveStarHotels(); // GET /api/hotels/5-star/
        const data = response?.data;

        // ✅ If Vite returns index.html (proxy/baseURL issue), you'll see HTML here
        if (typeof data === "string" && data.trim().toLowerCase().startsWith("<!doctype")) {
          throw new Error(
            "API returned HTML instead of JSON. Fix Vite proxy or set correct API baseURL."
          );
        }

        // ✅ Support both shapes:
        // 1) Array: [...]
        // 2) Paginated object: { results: [...] }
        const hotels = Array.isArray(data) ? data : (data?.results ?? []);

        if (!mounted) return;
        setFiveStarHotels(hotels);

        console.log("5-star hotels (normalized):", hotels);
        console.log("raw response.data:", data);
      } catch (err) {
        console.error("Failed to fetch 5-star hotels:", err);

        if (!mounted) return;
        setFiveStarHotels([]); // ✅ prevent .map crash
        setError(err?.message || "An error occurred while fetching hotels.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchFiveStarHotels();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
          <h2 className="text-white mt-4">Loading...</h2>
          <p className="text-gray-300">Your adventure is about to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[100px] p-10 bg-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center">5-Star Resorts</h1>
      <p className="text-lg text-center mt-4">
        Discover luxury at its finest in our 5-star resorts.
      </p>

      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-xl border p-6 rounded-3xl">
        {Array.isArray(fiveStarHotels) &&
          fiveStarHotels.map((hotel) => {
            // 📸 images from API (Hotel.photos – JSONField)
            const photos = hotel?.photos;
            const primaryImage = Array.isArray(photos) ? photos[0] : photos;

            // 💰 compute "From" price from rooms (or hotel.price if defined)
            let fromPrice = hotel?.price;

            if (
              !fromPrice &&
              Array.isArray(hotel?.rooms) &&
              hotel.rooms.length > 0
            ) {
              const prices = hotel.rooms
                .map((r) => Number(r?.price))
                .filter((p) => Number.isFinite(p));

              if (prices.length > 0) {
                fromPrice = Math.min(...prices);
              }
            }

            return (
              <Link
                key={hotel?.id}
                to={`/hotels/5-star/${hotel?.id}`}
                className="block"
              >
                <HotelCard
                  name={hotel?.name}
                  location={hotel?.location}
                  price={fromPrice}
                  img={primaryImage}
                  rating={hotel?.rating}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default FiveStarResorts;
