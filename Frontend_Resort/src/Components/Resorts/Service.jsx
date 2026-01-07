import { Link } from "react-router-dom";
import { FaCar, FaPlane, FaUmbrellaBeach, FaBinoculars } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Jim Corbett Safari Booking",
      icon: <FaBinoculars size={30} />,
      desc: "Enjoy a thrilling wildlife safari experience with easy online booking.",
      url: "/safari-booking",
    },
    {
      title: "Holidays Packages",
      icon: <FaUmbrellaBeach size={30} />,
      desc: "Explore customized holiday packages for families & couples.",
      url: "/booking",
    },
    {
      title: "Taxi Booking",
      icon: <FaCar size={30} />,
      desc: "Book quick and comfortable taxi services at affordable prices.",
      url: "/booking",
    },
    {
      title: "Flights Booking",
      icon: <FaPlane size={30} />,
      desc: "Find the best & lowest airfares for your domestic and international trips.",
      url: "/booking",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Services
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Link to={service.url} key={index}>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl 
              hover:scale-[1.03] transition-all cursor-pointer border border-gray-200"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600 text-center">{service.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
