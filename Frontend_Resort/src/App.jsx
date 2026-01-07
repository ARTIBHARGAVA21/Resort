import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import FiveStarResorts from "./Components/Resorts/FiveStarResorts";
import ThreeStarResorts from "./Components/Resorts/ThreeStarResorts";
import FourStarResorts from "./Components/Resorts/FourStarResorts";
import SafariBooking from "./Components/Resorts/SafariBooking";
import Error from "./Components/Sections/Error";
import HotelDetails from "./Utils/HotelDetails";
import Mainpage from "./Components/Sections/Mainpage";
import Services from "./Components/Resorts/service";
import Contact from "./Components/Resorts/contact";
import About from "./Components/Resorts/About";
import Booking from "./Components/Resorts/Booking";
// import HotelPage from "./Components/Resorts/HotelPage"; // keep if you need separately

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Mainpage /></Layout>} />
      <Route path="/five-star-resorts" element={<Layout><FiveStarResorts /></Layout>} />
      <Route path="/four-star-resorts" element={<Layout><FourStarResorts /></Layout>} />
      <Route path="/three-star-resorts" element={<Layout><ThreeStarResorts /></Layout>} />
      <Route path="/safari-booking" element={<Layout><SafariBooking /></Layout>} />

      {/* 🔑 This is the details route HotelCard links to */}
      <Route path="/hotels/:star/:id" element={<Layout><HotelDetails /></Layout>} />
      

      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/booking" element={<Layout><Booking /></Layout>} />

      {/* If you still want HotelPage, give it a different pattern to avoid conflicts, e.g.: */}
      {/* <Route path="/hotel-page/:id" element={<Layout><HotelPage /></Layout>} /> */}

      <Route path="*" element={<Layout><Error /></Layout>} />
    </Routes>
  );
}

export default App;
