import React, { useState } from "react";
import api from "../../Api/Api"; // <- uses bookResort

const SafariBooking = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    date: "",
    safari_type: "",
    safari_time: "",
    form_type: "safari_booking",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.bookResort(formData);
      alert("Booking submitted successfully!");
      console.log("Booking response:", response.data);

      setFormData({
        full_name: "",
        email: "",
        mobile_number: "",
        date: "",
        safari_type: "",
        safari_time: "",
        form_type: "safari_booking",
      });
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      alert("Something went wrong while submitting your booking.");
    }
  };

  const bgUrl =
    "https://cdn.resortsbythebaagh.com/public/new-home/images/corbet-img1.webp";

  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-start pt-[140px] pb-10 px-4 md:px-10 bg-no-repeat"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        // ✅ Tiger is usually at bottom — make it visible
        backgroundPosition: "center bottom",
      }}
    >
      {/* ✅ Better overlay (top darker for readability + bottom slightly lighter to show tiger) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/35" />

      {/* Content wrapper */}
      <div className="relative w-full max-w-2xl flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-black/55 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-yellow-500"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Safari Booking Date
          </h1>

          {/* Booking Date */}
          <div className="relative mb-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/95"
              required
            />
            <span className="absolute left-3 top-3 text-gray-700">📅</span>
          </div>

          {/* Safari Type & Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Safari Type */}
            <div className="relative">
              <select
                name="safari_type"
                value={formData.safari_type}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/95"
                required
              >
                <option value="">—Please choose—</option>
                <option value="Jeep Safari">Jeep Safari</option>
                <option value="Canter Safari">Canter Safari</option>
              </select>
              <span className="absolute left-3 top-3 text-gray-700">🦁</span>
            </div>

            {/* Safari Time */}
            <div className="relative">
              <select
                name="safari_time"
                value={formData.safari_time}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/95"
                required
              >
                <option value="">—Please choose—</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
              <span className="absolute left-3 top-3 text-gray-700">⏰</span>
            </div>
          </div>

          {/* Full Name */}
          <div className="relative mb-4">
            <input
              type="text"
              name="full_name"
              placeholder="Your Name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/95"
              required
            />
            <span className="absolute left-3 top-3 text-gray-700">👤</span>
          </div>

          {/* Mobile Number */}
          <div className="relative mb-4">
            <input
              type="tel"
              name="mobile_number"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/95"
              required
            />
            <span className="absolute left-3 top-3 text-gray-700">📞</span>
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white/95"
              required
            />
            <span className="absolute left-3 top-3 text-gray-700">📧</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SafariBooking;
