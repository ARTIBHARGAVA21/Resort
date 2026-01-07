import React, { useState } from "react";
import api from "../../Api/Api"; // Adjust path to your api.js

/** Icons */
const IconUser = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
  </svg>
);

const IconPhone = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.14 15.14 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1Z" />
  </svg>
);

const IconMail = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z" />
  </svg>
);

const IconCalendar = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2Zm14 8H3v10h18V10Z" />
  </svg>
);

const IconBed = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 11V7a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v2h5a2 2 0 0 1 2 2v6h-2v-2H6v2H4v-8Zm2-4v2h5V7H6Z" />
  </svg>
);

const ChevronDown = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const InputWithIcon = ({
  icon,
  placeholder,
  type = "text",
  onChange,
  name,
}) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
      {icon}
    </span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Footer = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState(""); // "book" | "callback"
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    room_type: "",
    check_in: "",
    check_out: "",
    additional_requests: "",
  });

  const resetForm = () =>
    setFormData({
      full_name: "",
      email: "",
      mobile_number: "",
      room_type: "",
      check_in: "",
      check_out: "",
      additional_requests: "",
    });

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = (type) => {
    setFormType(type); // "book" or "callback"
    resetForm();
    setOpenForm(true);
  };

  const closeModal = () => setOpenForm(false);

  const submitForm = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      let payload;

      if (formType === "book") {
        // Room booking payload – use form_type = "room_booking" to match backend
        payload = {
          full_name: formData.full_name,
          email: formData.email,
          mobile_number: formData.mobile_number,
          room_type: formData.room_type,
          check_in: formData.check_in,
          check_out: formData.check_out,
          additional_requests: formData.additional_requests,
          form_type: "room_booking",
          date: formData.check_in || today, // required date field
        };
      } else {
        // Callback payload – minimal fields
        payload = {
          full_name: formData.full_name,
          email: formData.email,
          mobile_number: formData.mobile_number,
          form_type: "callback",
          date: today,
        };
      }

      const response = await api.bookResort(payload);
      alert(response.data?.message || "Submitted successfully");
      setOpenForm(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        {/* Footer Grid (About / Links / Social) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">About Us</h2>
            <p className="text-sm">
              Welcome to our resort! We provide luxurious experiences to make
              your stay memorable. Enjoy top-class amenities and stunning
              locations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-500">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-yellow-500">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
         <div>
  <h2 className="text-lg font-semibold text-white mb-4">
    Follow Us
  </h2>

  <div className="flex space-x-4 mb-4 text-lg">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook-f hover:text-blue-500"></i>
    </a>

    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter hover:text-blue-400"></i>
    </a>

    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram hover:text-pink-500"></i>
    </a>

    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin-in hover:text-blue-700"></i>
    </a>
  </div>
</div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Resort Co. All Rights Reserved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => openModal("book")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          >
            Book Now
          </button>
          <button
            onClick={() => openModal("callback")}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded"
          >
            Request Callback
          </button>
        </div>
      </div>

      {/* MODAL */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 overflow-y-auto z-50">
          <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-white rounded-lg shadow-xl mx-2 my-4">
            {/* Header */}
            <div className="bg-blue-700 px-4 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-white text-lg font-semibold">
                {formType === "book" ? "Book Room" : "Request Callback"}
              </h2>
              <button
                onClick={closeModal}
                className="text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3 max-h-[80vh] overflow-y-auto">
              {/* Callback Form */}
              {formType === "callback" && (
                <>
                  <InputWithIcon
                    icon={<IconUser className="w-5 h-5" />}
                    name="full_name"
                    onChange={handleInput}
                    placeholder="Your Name"
                  />
                  <InputWithIcon
                    icon={<IconPhone className="w-5 h-5" />}
                    name="mobile_number"
                    onChange={handleInput}
                    placeholder="Mobile Number"
                  />
                  <InputWithIcon
                    icon={<IconMail className="w-5 h-5" />}
                    name="email"
                    onChange={handleInput}
                    placeholder="Your Email"
                    type="email"
                  />
                  <button
                    onClick={submitForm}
                    className="mt-2 w-full sm:w-36 bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-md font-semibold"
                  >
                    Submit
                  </button>
                </>
              )}

              {/* Book Now Form */}
              {formType === "book" && (
                <>
                  <label className="text-gray-800 text-sm font-medium block">
                    Select Room
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                      <IconBed className="w-5 h-5" />
                    </span>
                    <select
                      name="room_type"
                      onChange={handleInput}
                      className="w-full bg-gray-50 border rounded-md py-2.5 pl-10 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        — Select Room —
                      </option>
                      <option value="Deluxe Room">Deluxe Room</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Premium Cottage">Premium Cottage</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputWithIcon
                      icon={<IconCalendar className="w-5 h-5" />}
                      name="check_in"
                      onChange={handleInput}
                      type="date"
                    />
                    <InputWithIcon
                      icon={<IconCalendar className="w-5 h-5" />}
                      name="check_out"
                      onChange={handleInput}
                      type="date"
                    />
                  </div>

                  <InputWithIcon
                    icon={<IconUser className="w-5 h-5" />}
                    name="full_name"
                    onChange={handleInput}
                    placeholder="Your Name"
                  />
                  <InputWithIcon
                    icon={<IconPhone className="w-5 h-5" />}
                    name="mobile_number"
                    onChange={handleInput}
                    placeholder="Mobile Number"
                  />
                  <InputWithIcon
                    icon={<IconMail className="w-5 h-5" />}
                    name="email"
                    onChange={handleInput}
                    placeholder="Your Email"
                    type="email"
                  />
                  <textarea
                    name="additional_requests"
                    placeholder="Additional Requests (Optional)"
                    onChange={handleInput}
                    className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  ></textarea>

                  <button
                    onClick={submitForm}
                    className="mt-2 w-full sm:w-40 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md font-semibold"
                  >
                    Book Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
