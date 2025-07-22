import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  message,
  Tooltip,
  Modal,
  InputNumber,
  Button,
} from "antd";
import {
  TeamOutlined,
  ShoppingOutlined,
  DollarOutlined,
  RiseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import axios from "axios";

import {
  useDashboardChartData,
  getBarChartOptions,
  getPieChartOptions,
  getLineChartOptions,
} from "./bieudo";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    newOrders: 0,
    totalRevenue: 0,
    conversionRate: 0,
  });

  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const { revenueData, statusData, userTrend, orderTrend } =
    useDashboardChartData();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/dashboard")
      .then((res) => setDashboardData(res.data))
      .catch((err) => console.error("Lỗi khi tải dữ liệu Dashboard:", err));

    axios
      .get("http://localhost:8080/api/dashboard/top-selling")
      .then((res) => setTopProducts(res.data))
      .catch((err) => console.error("Lỗi tải top sản phẩm:", err));

    fetchLowStock();
  }, []);

  const fetchLowStock = () => {
    axios
      .get("http://localhost:8080/api/dashboard/low-stock")
      .then((res) => {
        const mapped = res.data.content.map((item) => ({
          id: item.variantId,
          name: `${item.tensp} - ${item.color} - ${item.storage}`,
          stock: item.soluong,
          imageUrl: item.imageUrl,
        }));
        setLowStockProducts(mapped);
      })
      .catch((err) => console.error("Lỗi tải thống kê tồn kho:", err));
  };

  const handleEditStock = (record) => {
    setSelectedProduct(record);
    setQuantity(0);
    setIsModalOpen(true);
  };

  const handleUpdateStock = async () => {
    if (!quantity || quantity <= 0) {
      message.warning("Vui lòng nhập số lượng hợp lệ.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/variants/${selectedProduct.id}/add-stock`,
        { quantity }
      );
      message.success("Cập nhật tồn kho thành công!");
      setIsModalOpen(false);
      fetchLowStock();
    } catch (error) {
      message.error("Cập nhật thất bại.");
      console.error(error);
    }
  };

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

  const topProductsColumns = [
    {
      title: "TOP",
      key: "index",
      render: (_, __, index) => `${index + 1}`,
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (image) => {
        const fullImageUrl = image?.startsWith("http")
          ? image
          : `http://localhost:8080/images/products/${image}`;
        return (
          <img
            src={fullImageUrl}
            alt="product"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 4,
            }}
            onError={(e) => (e.target.src = "/fallback.png")}
          />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      key: "tensp",
      render: (_, record) =>
        `${record.tensp} - ${record.color} - ${record.storage}`,
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "totalSold",
      key: "totalSold",
    },
    {
      title: "Doanh thu (₫)",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) =>
        revenue != null ? `${(revenue / 1_000_000).toFixed(1)}M₫` : "0₫",
    },
  ];

  const lowStockColumns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (image) => {
        const fullImageUrl = image?.startsWith("http")
          ? image
          : `http://localhost:8080/images/products/${image}`;
        return (
          <img
            src={fullImageUrl}
            alt="product"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 4,
            }}
            onError={(e) => (e.target.src = "/fallback.png")}
          />
        );
      },
    },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Tồn kho", dataIndex: "stock", key: "stock" },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <span className="text-red-600 font-semibold">
          {record.stock > 0 ? "Sắp hết" : "Hết hàng"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Thêm tồn kho">
          <EditOutlined
            style={{
              color: "#1890ff",
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => handleEditStock(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Tổng quan
        </Title>
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
              option={getBarChartOptions(revenueData)}
              style={{ height: 350 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Phân bổ đơn hàng" className="h-full shadow-sm">
            <ReactECharts
              option={getPieChartOptions(statusData)}
              style={{ height: 350 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Xu hướng" className="shadow-sm">
            <ReactECharts
              option={getLineChartOptions(userTrend, orderTrend)}
              style={{ height: 350 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Top 5 sản phẩm bán chạy nhất" className="shadow-sm">
            <Table
              dataSource={topProducts.slice(0, 5)}
              columns={topProductsColumns}
              pagination={false}
              rowKey="variantId"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Sản phẩm sắp hết hàng" className="shadow-sm">
            <Table
              dataSource={lowStockProducts}
              columns={lowStockColumns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* Modal thêm tồn kho */}
      <Modal
        open={isModalOpen}
        title="Thêm số lượng tồn kho"
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p>
          Sản phẩm:{" "}
          <strong>{selectedProduct ? selectedProduct.name : ""}</strong>
        </p>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value)}
          style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
        />
        <div style={{ textAlign: "right" }}>
          <Button onClick={() => setIsModalOpen(false)} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" onClick={handleUpdateStock}>
            Cập nhật
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
