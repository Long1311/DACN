import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Typography,
  DatePicker,
  Space,
} from "antd";
import {
  TeamOutlined,
  ShoppingOutlined,
  DollarOutlined,
  RiseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import axios from "axios";

import {
  getBarChartOptions,
  getPieChartOptions,
  getLineChartOptions,
} from "./bieudo";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    newOrders: 0,
    totalRevenue: 0,
    conversionRate: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/dashboard")
      .then((res) => setDashboardData(res.data))
      .catch((err) => console.error("Lỗi khi tải dữ liệu Dashboard:", err));

    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const formatted = res.data
          .map((order) => ({
            key: order.id,
            id: "DH" + String(order.id).padStart(3, "0"),
            customer: `User ${order.userId}`,
            date: "Chưa có ngày", // Nếu có order.createdAt thì format lại tại đây
            total: `${order.thanhtien.toLocaleString("vi-VN")}₫`,
            status: convertStatus(order.trangthai),
            payment: convertPayment(order.trangthai),
          }))
          .slice(0, 5); // Lấy 5 đơn hàng gần nhất
        setRecentOrders(formatted);
      })
      .catch((err) =>
        console.error("Lỗi khi tải danh sách đơn hàng gần đây:", err)
      );
  }, []);

  const convertStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "SHIPPING":
        return "Đang giao";
      case "COMPLETED":
        return "Đã giao";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const convertPayment = (status) => {
    switch (status) {
      case "COMPLETED":
        return "Đã thanh toán";
      case "CANCELLED":
        return "Hoàn tiền";
      default:
        return "Chưa thanh toán";
    }
  };

  const orderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "Đã giao":
            color = "#10B981";
            break;
          case "Đang giao":
            color = "#0EA5E9";
            break;
          case "Chờ xác nhận":
            color = "#F59E0B";
            break;
          case "Đã hủy":
            color = "#EF4444";
            break;
          default:
            color = "#000";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => {
        let color = "";
        switch (payment) {
          case "Đã thanh toán":
            color = "#10B981";
            break;
          case "Chưa thanh toán":
            color = "#F59E0B";
            break;
          case "Hoàn tiền":
            color = "#EF4444";
            break;
          default:
            color = "#000";
        }
        return <span style={{ color }}>{payment}</span>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  const cardData = [
    {
      title: "Tổng người dùng",
      value: dashboardData.totalUsers.toLocaleString(),
      isUp: true,
      icon: <TeamOutlined />,
      color: "#4F46E5",
    },
    {
      title: "Đơn hàng mới",
      value: dashboardData.newOrders.toLocaleString(),
      isUp: true,
      icon: <ShoppingOutlined />,
      color: "#0EA5E9",
    },
    {
      title: "Doanh thu",
      value: `${(dashboardData.totalRevenue / 1_000_000).toFixed(1)}M₫`,
      isUp: true,
      icon: <DollarOutlined />,
      color: "#10B981",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: `${dashboardData.conversionRate.toFixed(2)}%`,
      isUp: false,
      icon: <RiseOutlined />,
      color: "#F59E0B",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Tổng quan
        </Title>
        <RangePicker className="!rounded-button" />
      </div>

      <Row gutter={[24, 24]}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <Text type="secondary">{card.title}</Text>
                  <Title level={3} className="m-0 mt-2">
                    {card.value}
                  </Title>
                  <Text
                    className={`flex items-center mt-1 ${
                      card.isUp ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {card.isUp ? "+12%" : "-3%"}
                  </Text>
                </div>
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <span className="text-xl" style={{ color: card.color }}>
                    {card.icon}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card title="Doanh thu theo tháng" className="h-full shadow-sm">
            <ReactECharts
              option={getBarChartOptions()}
              style={{ height: 350 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Phân bổ đơn hàng" className="h-full shadow-sm">
            <ReactECharts
              option={getPieChartOptions()}
              style={{ height: 350 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Xu hướng" className="shadow-sm">
            <ReactECharts
              option={getLineChartOptions()}
              style={{ height: 350 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Đơn hàng gần đây" className="shadow-sm">
            <Table
              dataSource={recentOrders}
              columns={orderColumns}
              pagination={false}
              className="overflow-x-auto"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
