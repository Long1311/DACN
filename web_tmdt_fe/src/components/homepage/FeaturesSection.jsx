import React from "react";
import { Row, Col } from "antd";

const FeaturesSection = () => {
  return (
    <div className="mb-12">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <div className="flex flex-col items-center text-center p-6">
            <div className="text-4xl text-blue-500 mb-4">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <h3 className="text-lg font-bold mb-2">Giao hàng miễn phí</h3>
            <p className="text-gray-500">Cho tất cả các đơn hàng</p>
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div className="flex flex-col items-center text-center p-6">
            <div className="text-4xl text-blue-500 mb-4">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-lg font-bold mb-2">Bảo hành chính hãng</h3>
            <p className="text-gray-500">12 tháng bảo hành toàn quốc</p>
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div className="flex flex-col items-center text-center p-6">
            <div className="text-4xl text-blue-500 mb-4">
              <i className="fas fa-sync-alt"></i>
            </div>
            <h3 className="text-lg font-bold mb-2">Đổi trả dễ dàng</h3>
            <p className="text-gray-500">30 ngày đổi trả miễn phí</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FeaturesSection;
