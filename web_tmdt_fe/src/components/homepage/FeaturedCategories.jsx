import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/danhmuc/${categoryId}`);
  };

  const handleDiscountClick = () => {
    navigate("/discount");
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Danh mục nổi bật</h2>
      <Row gutter={[24, 24]}>
        <Col xs={12} md={6}>
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-6 text-white h-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleCategoryClick("1")}
          >
            <div className="text-4xl mb-4">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <div className="text-xl font-bold text-center">iPhone</div>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-6 text-white h-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleCategoryClick("2")}
          >
            <div className="text-4xl mb-4">
              <i className="fas fa-mobile"></i>
            </div>
            <div className="text-xl font-bold text-center">Samsung</div>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div
            className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg p-6 text-white h-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleCategoryClick("3")}
          >
            <div className="text-4xl mb-4">
              <i className="fas fa-headphones"></i>
            </div>
            <div className="text-xl font-bold text-center">Phụ kiện</div>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div
            className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg p-6 text-white h-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={handleDiscountClick}
          >
            <div className="text-4xl mb-4">
              <i className="fas fa-tag"></i>
            </div>
            <div className="text-xl font-bold text-center">Khuyến mãi</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FeaturedCategories;