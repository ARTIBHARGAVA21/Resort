import { useState } from "react";

export default function Booking() {
  const [selectedService, setSelectedService] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        Book Your Service
      </h1>

      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
        Select your service and complete the booking form below.  
        We will contact you shortly with confirmation.
      </p>

      <div className="bg-white shadow-xl max-w-2xl mx-auto p-8 rounded-2xl border">
        
        {/* Service Selector */}
        <label className="font-semibold text-gray-700">Select Service</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="border p-3 rounded-lg w-full mt-2 mb-6"
        >
          <option value="">-- Select a Service --</option>
          <option value="Safari">Jim Corbett Safari Booking</option>
          <option value="Holiday">Holidays Package</option>
          <option value="Taxi">Taxi Booking</option>
          <option value="Flight">Flight Booking</option>
        </select>

        {/* Main Form */}
        <form className="grid gap-5">

          {/* Customer Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded-lg"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="border p-3 rounded-lg"
          />

          {/* Date */}
          <input
            type="date"
            className="border p-3 rounded-lg"
          />

          {/* Dynamic Fields Based on Service */}
          {selectedService === "Taxi" && (
            <div className="grid gap-5">
              <input
                type="text"
                placeholder="Pickup Location"
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Drop Location"
                className="border p-3 rounded-lg"
              />
            </div>
          )}

          {selectedService === "Flight" && (
            <div className="grid gap-5">
              <input
                type="text"
                placeholder="From Airport"
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="To Airport"
                className="border p-3 rounded-lg"
              />
            </div>
          )}

          {selectedService === "Holiday" && (
            <textarea
              placeholder="Any special requirements (optional)"
              className="border p-3 rounded-lg"
              rows={3}
            />
          )}

          {/* Submit Button */}
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}
