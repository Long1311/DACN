import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  Table,
  Typography,
  Input,
  message,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const { Search } = Input;

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/variants/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mapped = res.data.map((item, index) => ({
        key: index + 1,
        stt: index + 1,
        id: `SP${item.id.toString().padStart(3, "0")}`,
        name: item.tensp || "Không tên",
        color: item.color,
        storage: item.storage,
        price: item.gia?.toLocaleString("vi-VN") + "₫",
        stock: item.stock,
        status: item.stock > 0 ? "Còn hàng" : "Hết hàng",
        image: item.imageUrl?.startsWith("http")
          ? item.imageUrl
          : `http://localhost:8080/images/products/${item.imageUrl}`,
      }));

      setProducts(mapped);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      message.error("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
    },
    {
      title: "Sản phẩm",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={record.name}
            className="w-12 h-12 rounded-lg object-cover mr-3"
          />
          <Text strong>{record.name}</Text>
        </div>
      ),
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Bộ nhớ",
      dataIndex: "storage",
      key: "storage",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text style={{ color: status === "Còn hàng" ? "#10B981" : "#EF4444" }}>
          {status}
        </Text>
      ),
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">Quản lý sản phẩm</Title>
      </div>
      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Space>
            <Button icon={<FilterOutlined />}>Lọc</Button>
          </Space>
        </div>
        <Table
          dataSource={products}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default ProductsManagement;
