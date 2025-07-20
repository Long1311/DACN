import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  Table,
  Typography,
  Input,
  message,
  Select,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  StopOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddProduct from "./addProduct";

const { Title, Text } = Typography;
const { Option } = Select;

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/variants/search", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mapped = res.data.map((item, index) => ({
        key: index + 1,
        rawId: item.id,
        id: `SP${item.id.toString().padStart(3, "0")}`,
        name: item.tensp || "Không tên",
        color: item.color,
        storage: item.storage,
        price: item.gia?.toLocaleString("vi-VN") + "₫",
        stock: item.soluong,
        disabled: item.disabled || false,
        image: item.imageUrl?.startsWith("http")
          ? item.imageUrl
          : `http://localhost:8080/images/products/${item.imageUrl}`,
      }));

      setAllProducts(mapped);
      filterProducts(mapped, stockFilter, searchTerm);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      message.error("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (data, stock, search = "") => {
    let result = data;

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((item) => item.name.toLowerCase().includes(lower));
    }

    if (stock === "available") {
      result = result.filter((item) => item.stock > 0 && !item.disabled);
    } else if (stock === "out") {
      result = result.filter((item) => item.stock === 0 && !item.disabled);
    } else if (stock === "disabled") {
      result = result.filter((item) => item.disabled);
    }

    setProducts(result);
  };

  const handleToggleDisable = async (record) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8080/api/variants/${record.rawId}/toggle-disabled`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = allProducts.map((item) =>
        item.rawId === record.rawId
          ? { ...item, disabled: !item.disabled }
          : item
      );

      setAllProducts(updated);
      filterProducts(updated, stockFilter, searchTerm);
      message.success(res.data);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      message.error("Không thể thay đổi trạng thái sản phẩm.");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
    },
    {
      title: "Sản phẩm",
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
    },
    {
      title: "Bộ nhớ",
      dataIndex: "storage",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
    },
    {
      title: "Trạng thái",
      render: (_, record) => {
        let text = "Còn hàng";
        let color = "#10B981";
        if (record.disabled) {
          text = "Không bán";
          color = "#6B7280";
        } else if (record.stock === 0) {
          text = "Hết hàng";
          color = "#EF4444";
        }
        return <Text style={{ color }}>{text}</Text>;
      },
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button
            type="text"
            icon={record.disabled ? <CheckOutlined /> : <StopOutlined />}
            danger={!record.disabled}
            onClick={() => handleToggleDisable(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <Title level={4} className="m-0">
          Quản lý sản phẩm
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddProduct(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterProducts(allProducts, stockFilter, e.target.value);
            }}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Lọc trạng thái"
            onChange={(value) => {
              setStockFilter(value);
              filterProducts(allProducts, value, searchTerm);
            }}
            allowClear
            style={{ width: 180 }}
            suffixIcon={<FilterOutlined />}
            value={stockFilter || undefined}
          >
            <Option value="available">Còn hàng</Option>
            <Option value="out">Hết hàng</Option>
            <Option value="disabled">Không bán</Option>
          </Select>
        </div>

        <Table
          dataSource={products}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modal Thêm Sản Phẩm */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowAddProduct(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
            >
              ✖
            </button>
            <AddProduct
              onCancel={() => setShowAddProduct(false)}
              onSuccess={() => {
                setShowAddProduct(false);
                fetchVariants();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;
