// src/data/hotelsData.js
//3 star hotel
import Xomotel from "../assets/static/Xomotel.jpg";
import BlueRiver from "../assets/static/Corbett_Aroma.jpg";
import Kyari from "../assets/static/kabeela.jpg";
import Palms from "../assets/static/Palms.jpg";
import Vanasthali from "../assets/static/Vanasthali.jpg";
import Tiger_Groove from "../assets/static/Tiger_Groove.jpg";
import Maulik from "../assets/static/Maulik.jpg";
import MangoBloom from "../assets/static/Mango.jpg";
import CorbettFun from "../assets/static/Corbett.jpg";
import Baakhli from "../assets/static/Baakhli.jpg";
//4 star hotel
import TigerCamp from "../assets/static/Tiger_Camp.jpg";
import RoarResort from "../assets/static/Roar_Resort.jpg";
import BanyanRetreat from "../assets/static/Banyan_Retreat.jpg";
import LaTigre from "../assets/static/La_Tigre.jpg";
import LaPerle from "../assets/static/La_Perle.jpg";
import Clarissa from "../assets/static/Clarissa.jpg";

//5 star hotel
import GoldenTusk from "../assets/static/Golden_Tusk.jpg";
import BaaghSpa from "../assets/static/Baagh.jpg";

const hotels = {

// 3 star hotel
  27: {
    name: "Xomotel",
    images: [Xomotel, BlueRiver, Kyari],
    price: 3500,
    location: "Ramnagar",
    desc:
      "Xomotel sits tucked among greenery offering calm peaceful stays. Spacious rooms with wooden interiors provide great comfort.",
    roomTypes: [
      { id: "deluxe", name: "Deluxe Room", price: 2500 },
      { id: "super-deluxe", name: "Super Deluxe", price: 3000 },
    ],
    facilities: ["Free Wi-Fi", "Restaurant", "Parking", "Bonfire", "Laundry"],
    roomFacilities: ["AC / Heater", "TV", "Geyser", "Toiletries", "Room service"],
  },

  4: {
    name: "Blue River",
    images: [BlueRiver, MangoBloom, Palms],
    price: 4000,
    location: "Ramnagar",
    desc:
      "Blue River features cottages with soothing river views. Perfect for a refreshing stay away from city noise.",
    roomTypes: [
      { id: "deluxe", name: "Deluxe Room", price: 2800 },
      { id: "super-deluxe", name: "Super Deluxe", price: 3200 },
    ],
    facilities: ["Riverside sit-out", "Restaurant", "Wi-Fi", "Indoor games"],
    roomFacilities: ["Balcony", "Tea Maker", "Heater", "King bed"],
  },

  2: {
    name: "Kyari",
    images: [Kyari, CorbettFun, Baakhli],
    price: 4500,
    location: "Ramnagar",
    desc:
      "Kyari is an eco-friendly jungle lodge with cultural experiences and adventurous activities.",
    roomTypes: [
      { id: "cottage", name: "Jungle Cottage", price: 3500 },
      { id: "villa", name: "Family Villa", price: 4200 },
    ],
    facilities: ["Nature walks", "Safaris", "Restaurant", "Parking"],
    roomFacilities: ["Eco toiletries", "Cooler", "Desk", "Sit-out"],
  },

  28: {
    name: "Palms",
    images: [Palms, MangoBloom, Xomotel],
    price: 4200,
    location: "Jim Corbett",
    desc: "Palms offers luxury rooms with green surroundings and peaceful vibes.",
    roomTypes: [
      { id: "premium", name: "Premium Room", price: 3500 },
      { id: "suite", name: "Suite Room", price: 4800 },
    ],
    facilities: ["Pool", "Restaurant", "Parking", "Kids Play Area"],
    roomFacilities: ["AC", "TV", "Mini Fridge", "Room Service"],
  },

  9: {
    name: "Vanasthali",
    images: [Vanasthali, BlueRiver, Palms],
    price: 3800,
    location: "Corbett",
    desc: "Vanasthali is surrounded by nature and offers peaceful stay with greenery.",
    roomTypes: [
      { id: "standard", name: "Standard Room", price: 2600 },
      { id: "deluxe", name: "Deluxe Room", price: 3000 },
    ],
    facilities: ["Garden Area", "Dining", "Parking"],
    roomFacilities: ["TV", "Hot Water", "King Bed"],
  },

  10: {
    name: "Tiger Groove",
    images: [Tiger_Groove, CorbettFun, MangoBloom],
    price: 5000,
    location: "Jim Corbett",
    desc: "Tiger Groove offers jungle-facing rooms with adventure activities.",
    roomTypes: [
      { id: "jungle-view", name: "Jungle View", price: 4000 },
      { id: "suite", name: "Suite", price: 5500 },
    ],
    facilities: ["Safari Desk", "Restaurant", "Parking"],
    roomFacilities: ["AC", "TV", "Balcony", "Hot Water"],
  },

  29: {
    name: "Maulik",
    images: [Maulik, MangoBloom, CorbettFun],
    price: 3700,
    location: "Ramnagar",
    desc: "Maulik offers modern rooms with a mix of nature and comfort.",
    roomTypes: [
      { id: "premium", name: "Premium", price: 3200 },
      { id: "suite", name: "Suite", price: 4500 },
    ],
    facilities: ["Restaurant", "Gym", "Parking"],
    roomFacilities: ["AC", "TV", "Room Service"],
  },

  12: {
    name: "Mango Bloom",
    images: [MangoBloom, Palms, Xomotel],
    price: 5200,
    location: "Corbett",
    desc: "Mango Bloom offers luxury resort experience with premium facilities.",
    roomTypes: [
      { id: "premium", name: "Premium", price: 4300 },
      { id: "villa", name: "Villa", price: 6000 },
    ],
    facilities: ["Pool", "Spa", "Restaurant"],
    roomFacilities: ["AC", "TV", "Balcony", "Fridge"],
  },

  13: {
    name: "Corbett Fun",
    images: [CorbettFun, Kyari, MangoBloom],
    price: 3400,
    location: "Jim Corbett",
    desc: "Corbett Fun provides fun family stays with play areas and activities.",
    roomTypes: [
      { id: "deluxe", name: "Deluxe", price: 2600 },
      { id: "family", name: "Family Room", price: 3500 },
    ],
    facilities: ["Fun Zone", "Restaurant", "Parking"],
    roomFacilities: ["AC", "TV", "Room Service"],
  },

  14: {
    name: "Mango Bloom Premium",
    images: [MangoBloom, Baakhli, CorbettFun],
    price: 5400,
    location: "Corbett",
    desc: "Premium experience with upgraded amenities and luxury rooms.",
    roomTypes: [
      { id: "premium", name: "Premium", price: 4600 },
      { id: "suite", name: "Suite", price: 6500 },
    ],
    facilities: ["Pool", "Dining", "Spa"],
    roomFacilities: ["Balcony", "Mini Bar", "TV"],
  },

  15: {
    name: "Baakhli",
    images: [Baakhli, MangoBloom, Xomotel],
    price: 3600,
    location: "Ramnagar",
    desc: "Baakhli is a nature-inspired stay offering peaceful surroundings.",
    roomTypes: [
      { id: "standard", name: "Standard", price: 2600 },
      { id: "cottage", name: "Cottage", price: 3900 },
    ],
    facilities: ["Garden", "Dining", "Parking"],
    roomFacilities: ["TV", "Hot Water", "King Bed"],
  },


  //4 star hotel

24: {
    name: "Tiger Camp",
    images: [TigerCamp, RoarResort, BanyanRetreat],
    price: 7500,
    location: "Jim Corbett",
    desc: "Luxury resort with premium rooms and top-class facilities.",
    roomTypes: [
      { id: "premium", name: "Premium Room", price: 6000 },
      { id: "suite", name: "Suite Room", price: 8000 },
    ],
    facilities: ["Pool", "Spa", "Restaurant", "Parking"],
    roomFacilities: ["AC", "TV", "Mini Fridge", "Room service"],
  },

  25: {
  name: "Roar Resort",
  images: [RoarResort, TigerCamp, BanyanRetreat],
  price: 6500,
  location: "Jim Corbett National Park",
  desc:
    "Roar Resort offers a perfect blend of luxury and wildlife adventure. Surrounded by nature, it provides spacious rooms, outdoor activities, and delicious food.",
  roomTypes: [
    { id: "deluxe", name: "Deluxe Room", price: 5000 },
    { id: "super-deluxe", name: "Super Deluxe Room", price: 6000 },
    { id: "suite", name: "Suite Room", price: 8000 },
  ],
  facilities: [
    "Free Wi-Fi",
    "Swimming Pool",
    "Restaurant",
    "Parking",
    "Conference Hall",
    "Play Area",
  ],
  roomFacilities: [
    "AC / Heater",
    "TV",
    "Geyser",
    "Electric Kettle",
    "Toiletries",
    "Room service",
  ],
},

26: {
  name: "Banyan Retreat",
  images: [BanyanRetreat, RoarResort, LaTigre],
  price: 5500,
  location: "Ramnagar, Corbett",
  desc:
    "Banyan Retreat is known for its greenery, peaceful environment, and cozy rooms. It offers a relaxing experience for families and couples.",
  roomTypes: [
    { id: "cottage", name: "Luxury Cottage", price: 4500 },
    { id: "villa", name: "Premium Villa", price: 7000 },
  ],
  facilities: [
    "Restaurant",
    "Parking",
    "Swimming Pool",
    "Bonfire",
    "Garden Area",
  ],
  roomFacilities: ["AC", "TV", "Geyser", "Tea Maker", "Room service"],
},

20: {
  name: "La Tigre Resort",
  images: [LaTigre, TigerCamp, Clarissa],
  price: 8000,
  location: "Marchula, Corbett",
  desc:
    "La Tigre Resort offers a premium wildlife stay experience with luxurious rooms and top-class amenities. The location provides scenic views and adventure activities.",
  roomTypes: [
    { id: "villa", name: "Luxury Villa", price: 9000 },
    { id: "suite", name: "Royal Suite", price: 12000 },
  ],
  facilities: [
    "Swimming Pool",
    "Spa",
    "Multi-cuisine Restaurant",
    "Parking",
    "Gym",
    "Play Zone",
  ],
  roomFacilities: ["AC", "TV", "Mini Fridge", "Tea Maker", "Room service"],
},

21: {
  name: "La Perle River Resort",
  images: [LaPerle, BanyanRetreat, RoarResort],
  price: 7000,
  location: "Dhikuli, Corbett",
  desc:
    "La Perle River Resort is a riverside luxury property providing premium stay experiences, nature walks, and great hospitality.",
  roomTypes: [
    { id: "river-view", name: "River View Room", price: 7500 },
    { id: "garden-view", name: "Garden View Room", price: 6800 },
  ],
  facilities: [
    "Restaurant",
    "Parking",
    "Swimming Pool",
    "River Access",
    "Games Area",
  ],
  roomFacilities: ["AC", "TV", "Geyser", "Toiletries", "Room service"],
},

22: {
  name: "Clarissa Resort",
  images: [Clarissa, TigerCamp, LaPerle],
  price: 8500,
  location: "Ramnagar, Corbett",
  desc:
    "Clarissa Resort is a luxury retreat featuring elegant rooms, modern decor, and top-quality food. Perfect for vacations, events, and corporate stays.",
  roomTypes: [
    { id: "tusk", name: "Tusk Room", price: 7000 },
    { id: "woodland", name: "Woodland Cottage", price: 9000 },
  ],
  facilities: [
    "Spa",
    "Restaurant",
    "Swimming Pool",
    "Parking",
    "Banquet Hall",
    "Kids Play Area",
  ],
  roomFacilities: [
    "AC",
    "TV",
    "Geyser",
    "Coffee Maker",
    "Mini Fridge",
    "Room service",
  ],
},

23: {
  name: "The Golden Tusk",
  images: [GoldenTusk],
  price: 7500,
  location: "Jim Corbett",
  desc: "The Golden Tusk is a luxury resort offering spacious rooms, greenery, and premium hospitality.",
  roomTypes: [
    { id: "suite", name: "Suite Room", price: 9000 },
    { id: "villa", name: "Villa", price: 12000 },
  ],
  facilities: ["Pool", "Spa", "Restaurant", "Parking", "Gym"],
  roomFacilities: ["AC", "TV", "Mini Fridge", "Room Service"],
},

6: {
  name: "The Baagh Spa & Resort",
  images: [BaaghSpa],
  price: 6800,
  location: "Jim Corbett",
  desc: "The Baagh Spa & Resort offers nature-inspired luxury stays with wellness-focused amenities.",
  roomTypes: [
    { id: "deluxe", name: "Deluxe Room", price: 5500 },
    { id: "premium", name: "Premium Room", price: 7500 },
  ],
  facilities: ["Spa", "Restaurant", "Parking", "Swimming Pool"],
  roomFacilities: ["AC", "TV", "Geyser", "Room Service"],
},



};

export default hotels;
