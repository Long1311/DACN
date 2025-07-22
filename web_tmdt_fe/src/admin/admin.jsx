import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Space,
  Typography,
  Tooltip,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  BellOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  FolderOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Dashboard from "../admin/Dashboard";
import UsersManagement from "../admin/UsersManagement";
import OrdersManagement from "../admin/OrdersManagement";
import ProductsManagement from "../admin/ProductsManagement";
import CategoriesManagement from "../admin/CategoriesManagement";
import BaoCao from "../admin/baocao";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [userInfo, setUserInfo] = useState({ name: "", role: "", avatar: "" });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo({
          name: response.data.name || response.data.username,
          role: response.data.role,
          avatar: response.data.avatarUrl || "",
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const userMenu = (
    <Menu
      onClick={({ key }) => {
        if (key === "3") handleLogout();
      }}
      items={[
        {
          key: "3",
          label: "Đăng xuất",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UsersManagement />;
      case "orders":
        return <OrdersManagement />;
      case "products":
        return <ProductsManagement />;
      case "categories":
        return <CategoriesManagement />;
      case "baocao":
        return <BaoCao />;
      default:
        return <div>Nội dung không tồn tại</div>;
    }
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userInfo.name || "Admin"
  )}&background=random`;

  return (
    <Layout style={{ minHeight: "100vh", width: "1440px", margin: "0 auto" }}>
      <Sider
        width={280}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          backgroundColor: "#1F2937",
        }}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <div className="flex items-center gap-3 px-6">
            <DashboardOutlined style={{ fontSize: "24px", color: "#fff" }} />
            {!collapsed && (
              <Text strong style={{ fontSize: "18px", color: "#fff" }}>
                Admin Portal
              </Text>
            )}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenu]}
          style={{ backgroundColor: "#1F2937", padding: "16px 0" }}
          onClick={({ key }) => setActiveMenu(key)}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Tổng quan",
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
            },
            {
              key: "products",
              icon: <AppstoreOutlined />,
              label: "Quản lý sản phẩm",
            },
            {
              key: "categories",
              icon: <FolderOutlined />,
              label: "Quản lý danh mục",
            },
            {
              key: "orders",
              icon: <ShoppingOutlined />,
              label: "Quản lý đơn hàng",
            },
            {
              key: "baocao",
              icon: <FileTextOutlined />,
              label: "Báo cáo - Thống Kê",
            },
          ]}
        />
      </Sider>

      <Layout
        style={{ marginLeft: collapsed ? 80 : 280, transition: "all 0.2s" }}
      >
        <Header
          className="bg-white px-6 flex justify-between items-center shadow-sm"
          style={{
            height: 64,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <div />

          <div className="flex items-center">
            <Tooltip title="Thông báo">
              <Space className="mr-4 cursor-pointer">
                <Button
                  type="text"
                  icon={<BellOutlined style={{ fontSize: "18px" }} />}
                  className="!rounded-button"
                />
              </Space>
            </Tooltip>
            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar
                  src={userInfo.avatar?.trim() || null}
                  icon={!userInfo.avatar?.trim() ? <UserOutlined /> : null}
                  size={40}
                  className="bg-blue-500"
                />

                <div className="hidden md:flex flex-col justify-center">
                  <Text strong>{userInfo.name || "---"}</Text>
                  <Text type="secondary" className="text-xs">
                    {userInfo.role === "ROLE_ADMIN"
                      ? "Quản trị viên"
                      : "Người dùng"}
                  </Text>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: "0", minHeight: "calc(100vh - 64px)" }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
