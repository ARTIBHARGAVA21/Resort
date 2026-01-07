import React, { useState } from "react";
import TrueFocus from "../UsableAnimations/FocusText";
import api from "../../Api/Api";

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    date: "",
    room_type: "",
    additional_requests: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.bookResort(formData);

      alert("🎉 Booking Submitted Successfully!");
      console.log("Booking Response:", response.data);

      setFormData({
        full_name: "",
        email: "",
        date: "",
        room_type: "",
        additional_requests: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Booking Error:", error);
      setErrorMessage("Booking Failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex justify-center items-center px-3 md:px-0">
      {/* Background (sharper + richer colors) */}
      <div className="absolute inset-0 bg-landing-bg bg-cover bg-center animate-waterfallFlow saturate-125 contrast-125 brightness-110" />

      {/* Overlay (NO blur now — keeps image sharp) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center p-6 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white drop-shadow-2xl">
          <TrueFocus
            sentence="Welcome to BharatResorts.com"
            manualMode={false}
            blurAmount={5}
            borderColor="red"
            animationDuration={2}
            pauseBetweenAnimations={0.5}
          />
        </h1>

        {/* Book Button */}
        <button
          onClick={() => setShowForm(true)}
          className="group mt-10 relative text-lg sm:text-xl md:text-2xl inline-block font-semibold leading-6 text-white bg-black/60 backdrop-blur-lg rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform px-5 py-3 sm:px-7 sm:py-4 border border-white/20"
        >
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></span>
          <span className="relative flex items-center space-x-3 z-10">
            <span>Book Resort Now</span>
            <svg
              className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"></path>
            </svg>
          </span>
        </button>

        {/* Booking Form */}
        {showForm && (
          <div className="mt-10 w-full flex justify-center">
            <div className="w-full max-w-lg bg-white/95 rounded-3xl border border-slate-100 shadow-2xl px-4 sm:px-6 md:px-8 py-6 max-h-[80vh] sm:max-h-[75vh] md:max-h-[70vh] overflow-y-auto relative animate-fadeIn text-slate-800">
              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 text-lg"
              >
                ✕
              </button>

              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-teal-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                Resort Booking
              </h2>

              {errorMessage && (
                <p className="text-red-500 text-center mb-4 text-sm">
                  {errorMessage}
                </p>
              )}

              <form
                onSubmit={handleBookingSubmit}
                className="flex flex-col space-y-5 text-sm md:text-base"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Full Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      className="peer w-full px-3 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder-transparent outline-none"
                    />
                    <label className="absolute left-3 top-3 text-xs sm:text-sm text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-teal-600 bg-white px-1 rounded">
                      Full Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      className="peer w-full px-3 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder-transparent outline-none"
                    />
                    <label className="absolute left-3 top-3 text-xs sm:text-sm text-slate-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-teal-600 bg-white px-1 rounded">
                      Email
                    </label>
                  </div>

                  {/* Booking Date */}
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="peer w-full px-3 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 outline-none"
                    />
                    <label className="absolute left-3 -top-3 text-xs sm:text-sm text-teal-600 bg-white px-1 rounded">
                      Booking Date
                    </label>
                  </div>

                  {/* Room Type */}
                  <div className="relative">
                    <select
                      name="room_type"
                      value={formData.room_type}
                      onChange={handleInputChange}
                      required
                      className="peer w-full px-3 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 outline-none"
                    >
                      <option value="">Select Room Type</option>
                      <option value="Deluxe Room">Deluxe Room</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Premium Cottage">Premium Cottage</option>
                    </select>
                    <label className="absolute left-3 -top-3 text-xs sm:text-sm text-teal-600 bg-white px-1 rounded">
                      Room Type
                    </label>
                  </div>
                </div>

                {/* Additional Requests */}
                <div className="relative">
                  <textarea
                    name="additional_requests"
                    rows={3}
                    value={formData.additional_requests}
                    onChange={handleInputChange}
                    placeholder="Any special requests? (Optional)"
                    className="w-full px-3 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 outline-none text-sm md:text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 text-white text-sm md:text-base font-semibold rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-lg disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "Submit Booking"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
