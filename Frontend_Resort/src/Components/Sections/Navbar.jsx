import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../Api/Api";

export const Navbar = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      let query = e.target.value.toLowerCase().trim();
      e.target.value = "";
      if (!query) return;

      if (query.includes("5")) return navigate("/five-star-resorts");
      if (query.includes("4")) return navigate("/four-star-resorts");
      if (query.includes("3")) return navigate("/three-star-resorts");
      if (query.includes("safari")) return navigate("/Safari-booking");
      if (query.includes("booking")) return navigate("/booking");

      const idMatch = query.match(/(\d+)/);
      if (query.includes("hotel") && idMatch) {
        const id = idMatch[1];

        try {
          let res = await api.getHotelDetailsByStarAndId("5-star", id);
          if (res?.data) return navigate(`/hotels/5-star/${id}`);
        } catch {}

        try {
          let res = await api.getHotelDetailsByStarAndId("4-star", id);
          if (res?.data) return navigate(`/hotels/4-star/${id}`);
        } catch {}

        try {
          let res = await api.getHotelDetailsByStarAndId("3-star", id);
          if (res?.data) return navigate(`/hotels/3-star/${id}`);
        } catch {}

        return alert("Hotel not found!");
      }

      alert("No matching result found!");
    }
  };

  return (
    <nav className="fixed top-3 left-0 w-full z-50 px-3 sm:px-5">
      <div className="flex items-center bg-yellow-400 justify-between 
        w-full sm:w-[90%] lg:w-[80%] mx-auto py-4 px-4 sm:px-6 rounded-3xl 
        shadow-lg transition-all duration-300">

        {/* LOGO */}
        <p className="flex items-center font-bold text-xl sm:text-2xl gap-2 
          hover:scale-105 transition-all duration-300 hover:bg-black 
          hover:text-white px-2 py-1 rounded-xl">
          <Icon icon="fluent-mdl2:ski-resorts" width="26" height="26" />
          <Link to="/">TheBharatResorts</Link>
        </p>

        {/* SEARCH ICON */}
        <div
          className="cursor-pointer sm:mr-6"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Icon icon="mdi:magnify" width="28" height="28" className="hover:scale-110 transition-all" />
        </div>

        {/* HAMBURGER MENU */}
        <div className="block lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
            <Icon icon={isOpen ? "mdi:close" : "mdi:menu"} />
          </button>
        </div>

        {/* NAV LINKS */}
        <ul
          className={`flex flex-col lg:flex-row 
          ${isOpen ? "flex" : "hidden lg:flex"} 
          absolute lg:static top-[110%] left-0 w-full lg:w-auto 
          bg-white lg:bg-transparent rounded-xl shadow-lg lg:shadow-none 
          lg:items-center lg:gap-10 text-lg font-medium transition-all z-40`}
        >
          {[
            { to: "/five-star-resorts", label: "5 Star Resorts" },
            { to: "/four-star-resorts", label: "4 Star Resorts" },
            { to: "/three-star-resorts", label: "3 Star Resorts" },
            { to: "/Safari-booking", label: "Safari Booking", icon: "mdi:jeepney" }
          ].map((item, i) => (
            <li
              key={i}
              className="cursor-pointer hover:scale-110 transition-all duration-300
              flex gap-2 justify-center p-4 lg:p-0 hover:bg-black hover:text-white
              rounded-xl lg:hover:px-3 lg:hover:py-1"
            >
              <Icon icon={item.icon || "ri:hotel-fill"} width="24" height="24" />
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto mt-3 bg-white shadow-lg rounded-2xl p-3">
          <input
            type="text"
            placeholder="Search 5 star, safari, booking, hotel 12..."
            className="w-full px-4 py-3 text-base sm:text-lg border border-gray-300 rounded-xl outline-none"
            onKeyDown={handleSearch}
            autoFocus
          />
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
};
