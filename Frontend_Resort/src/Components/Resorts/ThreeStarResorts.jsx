import React, { useEffect, useState } from "react";
import api from "../../Api/Api";
import HotelCard from "../../Utils/HotelCard";
import { Link } from "react-router-dom";

const ThreeStarResorts = () => {
  const [threeStarHotels, setThreeStarHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreeStarHotels = async () => {
      try {
        setLoading(true);
        const response = await api.getThreeStarHotels(); // /hotels/3-star/
        setThreeStarHotels(response.data || []);
      } catch (err) {
        setError(err.message || "An error occurred while fetching hotels.");
      } finally {
        setLoading(false);
      }
    };

    fetchThreeStarHotels();
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
      <h1 className="text-3xl font-bold text-center">3-Star Resorts</h1>
      <p className="text-lg text-center mt-4">
        Affordable luxury at our 3-star resorts.
      </p>

      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-xl border p-6 rounded-3xl">
        {threeStarHotels.map((hotel) => {
          // 🔹 Use ONLY images coming from API
          // photos should be a JSON array of URLs from your Django Hotel model
          const photos = hotel.photos;

          // first image from photos array (no local fallback)
          const primaryImage = Array.isArray(photos)
            ? photos[0]
            : photos; // in case you store a single string

          // (Optional) compute "from" price from rooms, if you want
          let fromPrice = hotel.price; // if you have a price on hotel
          if (!fromPrice && Array.isArray(hotel.rooms) && hotel.rooms.length > 0) {
            const prices = hotel.rooms
              .map((r) => Number(r.price))
              .filter((p) => !isNaN(p));
            if (prices.length > 0) {
              fromPrice = Math.min(...prices);
            }
          }

          return (
            <Link
              key={hotel.id}
              to={`/hotels/3-star/${hotel.id}`}
              className="block"
            >
              <HotelCard
                name={hotel.name}
                location={hotel.location}
                price={fromPrice}
                img={primaryImage}
                rating={hotel.rating} // if you add rating later in API
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeStarResorts;
