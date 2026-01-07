import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from './Components/Sections/Navbar';
import Footer from './Components/Sections/Footer';
const Layout = ({ children }) => {
  return (
    <>

      <Navbar />
      <main className="  w-auto h-auto">{children}</main>
    <Footer/>
      </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
