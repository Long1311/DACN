import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sanpham/banners")
      .then((response) => {
        // Thêm domain đầy đủ để ảnh hiển thị đúng
        const fullUrls = response.data.map(
          (url) => `http://localhost:8080${url}`
        );
        setBanners(fullUrls);
      })
      .catch((error) => console.error("Error fetching banners:", error));
  }, []);

  return (
    <div className="mb-10 rounded-lg overflow-hidden shadow-md">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={banners.length > 1}
        className="w-full"
      >
        {banners.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={url}
                alt={`Banner ${index + 1}`}
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
