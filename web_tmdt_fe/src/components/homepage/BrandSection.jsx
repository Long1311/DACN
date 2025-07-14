import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const BrandSection = () => {
  const navigate = useNavigate();

  const handleBrandClick = (categoryId) => {
    navigate(`/danhmuc/${categoryId}`);
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Thương hiệu nổi tiếng</h2>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div
            className="relative rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleBrandClick(1)}
          >
            <img
              src="https://readdy.ai/api/search-image?query=Apple%20iPhone%20promotional%20image%20with%20multiple%20iPhone%20models%20displayed%20on%20a%20clean%20minimalist%20white%20background%20with%20subtle%20Apple%20branding%2C%20professional%20marketing%20material%2C%20high%20resolution&width=600&height=300&seq=12&orientation=landscape"
              alt="Apple"
              className="w-full h-[200px] object-cover transition-transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-white text-2xl font-bold mb-2">iPhone</h3>
                <p className="text-white text-sm">
                  Khám phá các sản phẩm iPhone mới nhất
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div
            className="relative rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleBrandClick(2)}
          >
            <img
              src="https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20promotional%20image%20with%20multiple%20Samsung%20smartphone%20models%20displayed%20on%20a%20clean%20minimalist%20blue%20background%20with%20subtle%20Samsung%20branding%2C%20professional%20marketing%20material%2C%20high%20resolution&width=600&height=300&seq=13&orientation=landscape"
              alt="Samsung"
              className="w-full h-[200px] object-cover transition-transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Samsung</h3>
                <p className="text-white text-sm">
                  Trải nghiệm công nghệ Galaxy mới nhất
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BrandSection;
