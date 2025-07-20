import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="pt-28">{children}</main>{" "}
      <Footer />
    </div>
  );
};

export default Layout;
