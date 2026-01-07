import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const Rating = ({ rating }) => {
  const MAX_STARS = 5;

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <Icon
          key={index}
          icon="mdi:star"
          className={`text-lg ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
