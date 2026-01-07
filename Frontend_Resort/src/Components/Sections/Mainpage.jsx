import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LandingPage from './LandingPage';

const Mainpage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after 3 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LandingPage />

      {/* RESPONSIVE MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center 
                        bg-black bg-opacity-50 backdrop-blur-sm z-[999]
                        px-4 sm:px-0">

          <div className="
            bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
            rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8
            transform transition-all duration-500 ease-out
            animate-slideDown
          ">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center">
              Welcome!
            </h2>

            <p className="mt-2 text-gray-600 text-sm sm:text-base text-center leading-relaxed">
              This is your modal content. It now adjusts perfectly for mobile, tablet and desktop.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base 
                         rounded-xl hover:bg-blue-700 active:scale-95 transition-transform"
            >
              Close
            </button>
          </div>

        </div>
      )}
    </>
  );
};

// PropTypes for validation
Mainpage.propTypes = {
  title: PropTypes.string,
};

export default Mainpage;
