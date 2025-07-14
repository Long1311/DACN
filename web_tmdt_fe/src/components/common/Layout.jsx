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
      {/* Nội dung giữa, do component con cung cấp */}
      <Footer />
    </div>
  );
};

export default Layout;
