import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Space,
  Table,
  Tabs,
  Typography,
  Input,
  DatePicker,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8080/api/orders/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const formatted = response.data.map((order) => ({
          key: order.id,
          id: 'DH' + String(order.id).padStart(3, '0'),
          customer: `User ${order.userId}`,
          date: 'Chưa có ngày',
          total: `${order.thanhtien.toLocaleString('vi-VN')}₫`,
          status: convertStatus(order.trangthai),
          payment: convertPayment(order.trangthai),
        }));
        setOrders(formatted);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      });
  }, []);

  const convertStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Chờ xác nhận';
      case 'SHIPPING':
        return 'Đang giao';
      case 'COMPLETED':
        return 'Đã giao';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const convertPayment = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'Đã thanh toán';
      case 'CANCELLED':
        return 'Hoàn tiền';
      default:
        return 'Chưa thanh toán';
    }
  };

  const orderColumns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Đã giao':
            color = '#10B981';
            break;
          case 'Đang giao':
            color = '#0EA5E9';
            break;
          case 'Chờ xác nhận':
            color = '#F59E0B';
            break;
          case 'Đã hủy':
            color = '#EF4444';
            break;
          default:
            color = '#000';
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: 'Thanh toán',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment) => {
        let color = '';
        switch (payment) {
          case 'Đã thanh toán':
            color = '#10B981';
            break;
          case 'Chưa thanh toán':
            color = '#F59E0B';
            break;
          case 'Hoàn tiền':
            color = '#EF4444';
            break;
          default:
            color = '#000';
        }
        return <span style={{ color }}>{payment}</span>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="!rounded-button cursor-pointer whitespace-nowrap"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            className="!rounded-button cursor-pointer whitespace-nowrap"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Quản lý đơn hàng
        </Title>
        <Space>
          <Button
            icon={<DownloadOutlined />}
            className="!rounded-button cursor-pointer whitespace-nowrap"
          >
            Xuất Excel
          </Button>
        </Space>
      </div>
      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Search
            placeholder="Tìm kiếm đơn hàng..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
            className="!rounded-button"
          />
          <Space>
            <Button
              icon={<FilterOutlined />}
              className="!rounded-button cursor-pointer whitespace-nowrap"
            >
              Lọc
            </Button>
            <RangePicker className="!rounded-button" />
          </Space>
        </div>
        <Tabs defaultActiveKey="all">
          <TabPane tab="Tất cả" key="all">
            <Table
              dataSource={orders}
              columns={orderColumns}
              pagination={{ pageSize: 10 }}
              className="overflow-x-auto"
            />
          </TabPane>
          <TabPane tab="Chờ xác nhận" key="pending">
            <Table
              dataSource={orders.filter((order) => order.status === 'Chờ xác nhận')}
              columns={orderColumns}
              pagination={{ pageSize: 10 }}
              className="overflow-x-auto"
            />
          </TabPane>
          <TabPane tab="Đang giao" key="shipping">
            <Table
              dataSource={orders.filter((order) => order.status === 'Đang giao')}
              columns={orderColumns}
              pagination={{ pageSize: 10 }}
              className="overflow-x-auto"
            />
          </TabPane>
          <TabPane tab="Đã giao" key="delivered">
            <Table
              dataSource={orders.filter((order) => order.status === 'Đã giao')}
              columns={orderColumns}
              pagination={{ pageSize: 10 }}
              className="overflow-x-auto"
            />
          </TabPane>
          <TabPane tab="Đã hủy" key="cancelled">
            <Table
              dataSource={orders.filter((order) => order.status === 'Đã hủy')}
              columns={orderColumns}
              pagination={{ pageSize: 10 }}
              className="overflow-x-auto"
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default OrdersManagement;
