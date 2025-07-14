import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import HeaderComponent from "./common/Header";
import Navbar from "./common/Navbar";
import BannerCarousel from "./homepage/BannerCarousel";
import FeaturedCategories from "./homepage/FeaturedCategories";
import FlashSale from "./homepage/FlashSale";
import FeaturedProducts from "./homepage/FeaturedProducts";
import BrandSection from "./homepage/BrandSection";
import FeaturesSection from "./homepage/FeaturesSection";
import FooterComponent from "./common/Footer";

const { Content } = Layout;

const TrangChu = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Timeout giả lập
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Navbar />
      <Content className="pt-32 pb-12 px-6 bg-gray-50">
        <div className="container mx-auto">
          <BannerCarousel />
          <FeaturedCategories />
          <FlashSale />
          <FeaturedProducts />
          <BrandSection />
          <FeaturesSection />
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default TrangChu;
