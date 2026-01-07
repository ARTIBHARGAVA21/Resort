import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const HotelCard = ({ id, star, name, location, price, img, rating }) => {
  // star must look like "3-star", "4-star", "5-star"
  const detailUrl = `/hotels/${star}/${id}`;

  return (
    <div
      className="
      group relative flex flex-col 
      w-full max-w-xs sm:max-w-sm md:max-w-md 
      h-[420px] sm:h-[460px] md:h-[500px]
      bg-white rounded-2xl shadow-xl overflow-hidden
      transition-transform duration-300 
      hover:-translate-y-2 hover:shadow-2xl
    "
    >
      {/* Image Section */}
      <div className="h-1/2 sm:h-2/3 relative bg-gray-200 overflow-hidden">
        <img
          src={img || "https://via.placeholder.com/350x200"}
          alt={name}
          className="
            w-full h-full object-cover 
            transition-transform duration-500 
            group-hover:scale-110
          "
        />
        <div
          className="
            absolute top-2 right-2 flex items-center 
            bg-blue-600 text-white text-xs sm:text-sm font-semibold 
            px-2 sm:px-3 py-1 rounded-full shadow-md
          "
        >
          <Rating rating={rating} />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col p-4 sm:p-5 md:p-6 space-y-3 flex-grow">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate">
          {name}
        </h3>

        <div className="flex items-center text-sm sm:text-base text-gray-500 space-x-2">
          <Icon icon="mdi:map-marker" className="text-lg text-red-500" />
          <span className="font-medium truncate">{location}</span>
        </div>

        <div className="flex items-center text-sm sm:text-base text-gray-600 space-x-2">
          <Icon icon="mdi:cash" className="text-lg text-green-600" />
          <span className="font-medium truncate">Price: ₹{price}</span>
        </div>

        <div className="flex justify-center mt-auto">
          <Link
            to={detailUrl}
            className="
            w-full flex items-center justify-center 
            bg-gradient-to-r from-blue-500 to-indigo-500 
            text-white text-sm sm:text-lg font-semibold 
            py-2.5 sm:py-3 rounded-xl shadow-lg 
            hover:from-blue-600 hover:to-indigo-600 
            hover:shadow-xl active:scale-95
            transition-all duration-300
          "
          >
            <Icon icon="mdi:hotel" className="text-xl sm:text-2xl mr-2" />
            <span>View Detail</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  star: PropTypes.string.isRequired, // "3-star" | "4-star" | "5-star"
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  img: PropTypes.string,
  rating: PropTypes.number.isRequired,
};

export default HotelCard;
