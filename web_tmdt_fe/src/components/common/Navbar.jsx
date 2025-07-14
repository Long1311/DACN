import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MobileOutlined, TagOutlined } from "@ant-design/icons";

const Navbar = () => {
  const items = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Sản phẩm",
      key: "products",
      icon: <MobileOutlined />,
      children: [
        { label: <Link to="/danhmuc/1">iPhone</Link>, key: "iphone" },
        { label: <Link to="/danhmuc/2">Samsung</Link>, key: "samsung" },
      ],
    },
    {
      label: <Link to="/discount">Giảm giá</Link>,
      key: "Khuyến mãi",
      icon: <TagOutlined />,
    },
    { label: <Link to="/danhmuc/3">Phụ kiện</Link>, key: "accessories" },
    { label: <Link to="/TinTuc">Tin Tức</Link>, key: "TinTuc" },
    { label: <Link to="/FaqPage">Hỏi đáp / FAQ</Link>, key: "FaqPage" },
  ];

  return (
    <div className="bg-white shadow-sm fixed top-16 w-full z-10">
      <div className="container mx-auto">
        <Menu
          mode="horizontal"
          items={items}
          className="border-0 font-medium"
          defaultSelectedKeys={["home"]}
        />
      </div>
    </div>
  );
};

export default Navbar;
