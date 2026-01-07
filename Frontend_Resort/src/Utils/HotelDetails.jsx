import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/Api"; // uses your star-wise functions

// Normalize any image-like item into a URL string
const normalizeImage = (img) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.url || img.src || img.image || img.path || "";
};

// HERO slider at the top (uses room images)
const HeroImageSlider = ({ images }) => {
  const normalized = Array.isArray(images)
    ? images.map(normalizeImage).filter(Boolean)
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!normalized.length) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">No images available</span>
      </div>
    );
  }

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? normalized.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === normalized.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-72 md:h-full">
      <img
        src={normalized[currentIndex]}
        alt={`Hotel image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {normalized.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center text-2xl"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center text-2xl"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

const HotelDetails = () => {
  const { star, id } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [bookingForm, setBookingForm] = useState({
    roomId: "",
    checkIn: "",
    checkOut: "",
    name: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;

        if (star === "5-star") {
          response = await api.getFiveStarHotelById(id);
        } else if (star === "4-star") {
          response = await api.getFourStarHotelById(id);
        } else if (star === "3-star") {
          response = await api.getThreeStarHotelById(id);
        } else {
          response = await api.getFiveStarHotelById(id);
        }

        setHotelDetails(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.detail ||
            err.message ||
            "An error occurred while fetching hotel details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (star && id) fetchHotelDetails();
  }, [star, id]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log("Booking form submitted:", bookingForm);
    alert("Booking form submitted (demo). Connect API here.");
  };

  if (loading) {
    return (
      <div className="pt-[100px] p-10 bg-white min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-[100px] p-10 bg-white min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!hotelDetails) {
    return (
      <div className="pt-[100px] p-10 bg-white min-h-screen">
        <div>Hotel not found.</div>
      </div>
    );
  }

  // Extract hotel fields
  const {
    name,
    overview,
    description,
    location,
    address,
    phone,
    contact_number,
    rating,
    stars,
    price,
    avg_price_per_night,
    starting_price,
    map_link,
    google_map_link,
    location_url,
    map,
    image,
    images,
    banner_image,
    facilities,
    room_facilities,
    videos,
    photo_gallery,
    rooms: apiRooms,
    roomTypes,
    room_set,
    similar_resorts,
  } = hotelDetails;

  const rooms = apiRooms || roomTypes || room_set || [];

  // IMAGE HANDLING
  const roomImageUrls = [];
  rooms.forEach((room) => {
    const imgs =
      room?.images ||
      room?.photos ||
      room?.gallery ||
      room?.photo_gallery ||
      room?.image_urls ||
      room?.room_images ||
      [];

    if (Array.isArray(imgs)) {
      imgs.forEach((img) => {
        const url = normalizeImage(img);
        if (url && !roomImageUrls.includes(url)) roomImageUrls.push(url);
      });
    } else {
      const url = normalizeImage(imgs);
      if (url && !roomImageUrls.includes(url)) roomImageUrls.push(url);
    }
  });

  if (!roomImageUrls.length) {
    const fallback = [];

    if (banner_image) fallback.push(normalizeImage(banner_image));
    if (image) fallback.push(normalizeImage(image));
    if (Array.isArray(images))
      images.forEach((img) => fallback.push(normalizeImage(img)));

    fallback.forEach((f) => f && roomImageUrls.push(f));
  }

  if (!roomImageUrls.length) {
    roomImageUrls.push(
      "https://via.placeholder.com/900x500?text=Hotel+Image"
    );
  }

  // STAR RATING
  const hotelRating = rating || stars || 0;

  // PHONE & ADDRESS
  const displayPhone = phone || contact_number || "";
  const displayAddress = address || location || "Location not specified";

  // PRICE LOGIC (fallback from room prices)
  let minRoomPrice = null;
  rooms.forEach((room) => {
    const val = room.price || room.rate;
    if (val) {
      const num = Number(val);
      if (!isNaN(num)) {
        minRoomPrice =
          minRoomPrice === null ? num : Math.min(minRoomPrice, num);
      }
    }
  });

  const resortPrice =
    price || avg_price_per_night || starting_price || minRoomPrice || null;

  const avgNightPriceText = resortPrice
    ? `AVG/NIGHT INR ${resortPrice}/-`
    : "AVG/NIGHT – Check Price";

  // GOOGLE MAP URL (always clickable)
  const googleMapUrlRaw =
    map_link || google_map_link || location_url || map || null;

  const googleMapUrlFinal =
    googleMapUrlRaw ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      displayAddress
    )}`;

  const mapHref = googleMapUrlFinal;

  // STAR RENDER
  const renderStars = (value) => {
    const count = Math.round(Number(value) || 0);
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-yellow-400 text-xl ${
              i < count ? "opacity-100" : "opacity-30"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const overviewText =
    overview ||
    description ||
    "Relax in a comfortable resort surrounded by nature.";

  // DEFAULT FACILITIES
  const facilitiesList =
    Array.isArray(facilities) && facilities.length > 0
      ? facilities
      : [
          "24x7 front desk & concierge",
          "Multi-cuisine restaurant",
          "Free Wi-Fi in lobby & rooms",
          "Swimming pool (seasonal)",
          "Parking facility",
        ];

  const roomFacilitiesList =
    Array.isArray(room_facilities) && room_facilities.length > 0
      ? room_facilities
      : [
          "Air-conditioned rooms",
          "Complimentary water",
          "Room service",
          "LED TV",
          "Daily housekeeping",
        ];

  const videoList =
    Array.isArray(videos) && videos.length > 0
      ? videos
      : [
          { title: "Resort Walkthrough", url: "https://drive.google.com/file/d/1aTdLwymz0v6AhOt32bogVHEKCafzGThF/view?usp=drive_link" },
          { title: "Nature Trail Around Resort", url: "https://drive.google.com/file/d/1FC9pQezQUmB2mFMOGVWpTwQLx_Cy0wZy/view?usp=drive_link" },
        ];

  const fallbackSimilar = [
    {
      id: "1",
      name: "The Tiger Groove Resort and Spa",
      price: 2500,
      rating: 5,
      image:
        "https://bharatresorts.com/wp-content/uploads/2023/05/eca160d1-87c0-4497-a2bc-2e188c7593b5.jpg",
    },
    {
      id: "2",
      name: "Xomotel Blue River resort Kyari",
      price: 1500,
      rating: 4,
      image:
        "https://bharatresorts.com/wp-content/uploads/2024/02/daf58738-4091-4aeb-97a5-d98f55f27034-1.jpg",
    },
    {
      id: "3",
      name: "Tiger Camp",
      price: 2000,
      rating: 3,
      image:
        "https://bharatresorts.com/wp-content/uploads/2023/05/be01145c-8ee4-4954-b8f1-c50763670592.jpg",
    },
    {
      id: "4",
      name: "Kabeela Resort Corbett",
      price: 3000,
      rating: 4,
      image:
        "https://bharatresorts.com/wp-content/uploads/2023/05/89d48ee2-591a-4d30-8e18-f09ea596d24d.jpg",
    },
    {
      id: "5",
      name: "Maulik Mansion Resort",
      price: 3500,
      rating: 3,
      image:
        "https://bharatresorts.com/wp-content/uploads/2023/05/37204eb5-523c-4cb7-ad9b-25f884fcf93a.jpg",
    },
  ];

  const similarResortList =
    Array.isArray(similar_resorts) && similar_resorts.length
      ? similar_resorts
      : fallbackSimilar;

  return (
    <div className="pt-[100px] bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* HERO + DETAILS */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/3">
            <HeroImageSlider images={roomImageUrls} />
          </div>

          {/* Info Card */}
          <div className="md:w-1/3 p-6 flex flex-col bg-white">
            {renderStars(hotelRating)}

            <h1 className="text-[32px] font-bold text-[#0054a6] mt-3">
              {name}
            </h1>

            <hr className="my-4" />

            {displayPhone && (
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#2ecc71] rounded-md flex justify-center items-center">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <span className="text-lg font-semibold">{displayPhone}</span>
              </div>
            )}

            <hr className="my-4" />

            <div className="flex items-start gap-3">
              <span className="text-xl text-[#0054a6] mt-1">📍</span>
              <p className="text-gray-800">{displayAddress}</p>
            </div>

            <hr className="my-4" />

            {/* AVG + MAP BUTTONS */}
            <div className="flex gap-4 flex-wrap">
              <button className="px-8 py-3 bg-[#0054a6] text-white rounded-md shadow-md">
                {avgNightPriceText}
              </button>

              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 bg-[#f3b016] text-gray-900 rounded-md shadow-md hover:bg-[#e3a10c]"
              >
                Google Map Direction
              </a>
            </div>
          </div>
        </div>

        {/* ROOMS + SIDEBAR */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ROOMS TABLE */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-3 bg-yellow-400 px-6 py-4 font-semibold">
              <span>ROOM TYPE</span>
              <span>PRICE</span>
              <span className="text-right">BOOK NOW</span>
            </div>

            {rooms.length === 0 ? (
              <div className="px-6 py-6 text-gray-600">
                No rooms available.
              </div>
            ) : (
              rooms.map((room, index) => (
                <div
                  key={room.id || index}
                  className="grid grid-cols-3 px-6 py-4 border-t"
                >
                  <div>
                    <span className="font-semibold">
                      {room.room_type || room.name || "Room"}
                    </span>
                    {room.description && (
                      <p className="text-sm text-gray-600">
                        {room.description}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold">
                    ₹{room.price || room.rate || "N/A"}
                  </span>

                  <div className="text-right">
                    <button
                      onClick={() =>
                        setBookingForm((x) => ({
                          ...x,
                          roomId: room.id || room.name,
                        }))
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              ))
            )}

            <p className="px-6 py-4 text-xs text-gray-500">
              *Prices may vary according to season & availability.
            </p>
          </div>

          {/* SIDEBAR: BOOK NOW + SIMILAR RESORTS */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Book Now Box */}
            <div className="bg-sky-100 p-5 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">Book Now</h2>

              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Select Room</label>
                  <select
                    name="roomId"
                    value={bookingForm.roomId}
                    onChange={handleBookingChange}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">— Choose —</option>
                    {rooms.map((room, index) => (
                      <option
                        key={room.id || index}
                        value={room.id || room.name}
                      >
                        {room.room_type || room.name} - ₹
                        {room.price || room.rate}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Check In</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingForm.checkIn}
                    onChange={handleBookingChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Check Out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingForm.checkOut}
                    onChange={handleBookingChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleBookingChange}
                  placeholder="Your Name"
                  className="w-full border p-2 rounded"
                />

                <input
                  type="tel"
                  name="mobile"
                  value={bookingForm.mobile}
                  onChange={handleBookingChange}
                  placeholder="Mobile"
                  className="w-full border p-2 rounded"
                />

                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleBookingChange}
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                />

                <button className="px-4 py-2 bg-gray-800 text-white rounded-md w-full">
                  Submit
                </button>
              </form>
            </div>

            {/* Similar Resorts Box */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Similar Resorts
              </h2>

              <div className="space-y-3">
                {similarResortList.map((resort, idx) => {
                  const rImage =
                    normalizeImage(resort.image) ||
                    normalizeImage(resort.thumbnail) ||
                    "https://via.placeholder.com/220x120?text=Resort";

                  const rRating = resort.rating || resort.stars || 0;

                  return (
                    <div
                      key={resort.id || idx}
                      className="flex border border-sky-300 bg-sky-50 rounded-md overflow-hidden"
                    >
                      <div className="w-28 h-20 flex-shrink-0">
                        <img
                          src={rImage}
                          alt={resort.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 px-3 py-2">
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < rRating ? "opacity-100" : "opacity-30"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm font-semibold text-blue-700 mt-1">
                          {resort.name || "Resort Name"}
                        </p>
                        {resort.price && (
                          <p className="text-xs text-gray-800 mt-1">
                            Price: ₹ {resort.price}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-10 bg-white rounded-2xl shadow-md">
          <div className="border-b flex">
            {[
              { key: "overview", label: "Overview" },
              { key: "facilities", label: "Facilities" },
              { key: "room_facility", label: "Room Facility" },
              { key: "videos", label: "Videos" },
              { key: "photos", label: "Photo Gallery" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 border-b-2 ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "overview" && <p>{overviewText}</p>}

            {activeTab === "facilities" && (
              <ul className="list-disc pl-5">
                {facilitiesList.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}

            {activeTab === "room_facility" && (
              <ul className="list-disc pl-5">
                {roomFacilitiesList.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}

            {activeTab === "videos" && (
              <ul className="list-disc pl-5">
                {videoList.map((v, i) => (
                  <li key={i}>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {v.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "photos" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(photo_gallery?.length
                  ? photo_gallery
                  : roomImageUrls.slice(0, 4)
                ).map((src, i) => (
                  <img
                    key={i}
                    src={typeof src === "string" ? src : src.url}
                    className="w-full h-40 object-cover rounded"
                    alt={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
