// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar, Dropdown, Button, Space, Typography, Tooltip } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Dashboard from '../admin/Dashboard';
import UsersManagement from '../admin/UsersManagement';
import OrdersManagement from '../admin/OrdersManagement';
import ProductsManagement from '../admin/ProductsManagement';
import CategoriesManagement from '../admin/CategoriesManagement';

const { Header, Sider, Content } = Layout;
const { Search: AntdSearch } = Input;
const { Text } = Typography;
const swiperModules = [Pagination, Autoplay];

// User dropdown menu
const userMenu = (
  <Menu
    items={[
      {
        key: '1',
        label: 'Thông tin cá nhân',
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: 'Cài đặt',
        icon: <SettingOutlined />,
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: 'Đăng xuất',
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'products':
        return <ProductsManagement />;
      case 'categories':
        return <CategoriesManagement />;
      default:
        return <div>Nội dung không tồn tại</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', width: '1440px', margin: '0 auto' }}>
      <Sider
        width={280}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="shadow-md"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          backgroundColor: '#1F2937',
        }}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <div className="flex items-center gap-3 px-6">
            <DashboardOutlined style={{ fontSize: '24px', color: '#fff' }} />
            {!collapsed && <Text strong style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Admin Portal</Text>}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenu]}
          style={{ backgroundColor: '#1F2937', padding: '16px 0' }}
          onClick={({ key }) => setActiveMenu(key)}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: 'Tổng quan',
            },
            {
              key: 'users',
              icon: <UserOutlined />,
              label: 'Quản lý người dùng',
            },
            {
              key: 'products',
              icon: <AppstoreOutlined />,
              label: 'Quản lý sản phẩm',
            },
            {
              key: 'categories',
              icon: <FolderOutlined />,
              label: 'Quản lý danh mục',
            },
            {
              key: 'orders',
              icon: <ShoppingOutlined />,
              label: 'Quản lý đơn hàng',
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'all 0.2s' }}>
        <Header className="bg-white px-6 flex justify-between items-center shadow-sm" style={{ height: 64, position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
          <AntdSearch
            placeholder="Tìm kiếm..."
            allowClear
            style={{ width: 300 }}
            className="!rounded-button"
          />
          <div className="flex items-center">
            <Tooltip title="Thông báo">
              <Space className="mr-4 cursor-pointer">
                <Button
                  type="text"
                  icon={<BellOutlined style={{ fontSize: '18px' }} />}
                  className="!rounded-button cursor-pointer whitespace-nowrap"
                />
              </Space>
            </Tooltip>
            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
              <div className="flex items-center cursor-pointer">
                <Avatar
                  src="https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20Vietnamese%20business%20person%20with%20modern%20minimalist%20style%2C%20high%20quality%2C%20realistic%2C%20studio%20lighting%2C%20neutral%20background%2C%20looking%20confident&width=100&height=100&seq=avatar1&orientation=squarish"
                  size={40}
                />
                <div className="ml-3 hidden md:block">
                  <Text strong>Nguyễn Minh Quân</Text>
                  <div>
                    <Text type="secondary" className="text-xs">Quản trị viên</Text>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0', minHeight: 'calc(100vh - 64px)' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;