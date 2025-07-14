import React from "react";
import { Layout, Row, Col, Divider, Button, Typography } from "antd";
import {
  ShoppingCartOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const FooterComponent = () => {
  return (
    <Footer className="bg-gray-800 text-white p-0">
      <div className="container mx-auto py-12">
        <Row gutter={[48, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="mb-6">
              <Title level={4} className="text-white mb-4">
                <ShoppingCartOutlined className="mr-2" />
                LongStore
              </Title>
              <Paragraph className="text-gray-400">
                Cửa hàng điện thoại uy tín hàng đầu Việt Nam. Chuyên cung cấp
                các sản phẩm smartphone chính hãng với giá tốt nhất thị trường.
              </Paragraph>
            </div>
            <div className="flex space-x-4">
              <Button
                type="text"
                shape="circle"
                icon={<FacebookOutlined />}
                className="text-white hover:text-blue-400 !rounded-button whitespace-nowrap"
              />
              <Button
                type="text"
                shape="circle"
                icon={<InstagramOutlined />}
                className="text-white hover:text-pink-400 !rounded-button whitespace-nowrap"
              />
              <Button
                type="text"
                shape="circle"
                icon={<TwitterOutlined />}
                className="text-white hover:text-blue-400 !rounded-button whitespace-nowrap"
              />
              <Button
                type="text"
                shape="circle"
                icon={<YoutubeOutlined />}
                className="text-white hover:text-red-500 !rounded-button whitespace-nowrap"
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              Thông tin
            </Title>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Liên hệ
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              Chính sách
            </Title>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              Liên hệ
            </Title>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-gray-400 mt-1 mr-3"></i>
                <span className="text-gray-400">
                  Yên Quán, Tân Phú, Quốc Oai, TP. Hà Nội
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-gray-400 mr-3"></i>
                <span className="text-gray-400">036 8910 JQK</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-gray-400 mr-3"></i>
                <span className="text-gray-400">longstore@gmail.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock text-gray-400 mr-3"></i>
                <span className="text-gray-400">
                  8:00 - 21:00, Thứ 2 - Chủ nhật
                </span>
              </li>
            </ul>
          </Col>
        </Row>
        <Divider className="bg-gray-700 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 LongStore. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex space-x-4">
            <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
            <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
            <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
            <i className="fab fa-cc-apple-pay text-2xl text-gray-400"></i>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
