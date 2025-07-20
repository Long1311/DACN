import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Button, Typography, Rate, message, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/variants/featured")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        const formatted = data.map((product) => ({
          ...product,
          imageUrl: product.imageUrl
            ? product.imageUrl.startsWith("http")
              ? product.imageUrl
              : `http://localhost:8080/images/products/${product.imageUrl}`
            : `https://via.placeholder.com/200?text=${
                product.tensp || "Featured Product"
              }`,
          rating: typeof product.rating === "number" ? product.rating : 0,
          reviewCount:
            typeof product.reviewCount === "number" ? product.reviewCount : 0,
        }));
        setProducts(formatted);
      })
      .catch((error) => {
        console.error("Error fetching featured products:", error);
        message.error("Không thể tải danh sách sản phẩm nổi bật.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 text-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 text-center">
        Không có sản phẩm nổi bật
      </div>
    );
  }

  return (
    <div className="mb-12">
      <Title level={2} className="mb-6">
        Sản phẩm nổi bật
      </Title>
      <Row gutter={[24, 24]}>
        {products.map((product) => (
          <Col xs={12} sm={12} md={6} key={product.id}>
            <Card
              hoverable
              cover={
                <div className="pt-4 px-4">
                  <img
                    alt={product.tensp || "Featured Product"}
                    src={product.imageUrl}
                    className="h-[200px] object-contain mx-auto"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/200?text=Error")
                    }
                  />
                </div>
              }
              className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="flex-1">
                <Title level={5} className="!mb-1 line-clamp-2 h-10">
                  {product.tensp || "Tên sản phẩm không xác định"}
                </Title>

                <div className="mb-2">
                  <Text className="text-red-600 font-bold text-lg">
                    {typeof product.gia === "number"
                      ? product.gia.toLocaleString("vi-VN") + " ₫"
                      : "Giá không xác định"}
                  </Text>

                  {typeof product.originalPrice === "number" &&
                    product.originalPrice > product.gia && (
                      <Text className="text-gray-400 line-through text-sm ml-2">
                        {product.originalPrice.toLocaleString("vi-VN") + " ₫"}
                      </Text>
                    )}
                </div>

                <div className="flex items-center mb-2">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={product.rating}
                    style={{
                      color: product.rating ? "#fadb14" : "#d9d9d9",
                    }}
                    className="text-sm"
                  />
                  <Text className="text-gray-500 text-xs ml-2">
                    {product.reviewCount > 0
                      ? `(${product.reviewCount})`
                      : "Chưa có đánh giá"}
                  </Text>
                </div>

                <Text strong className="block mb-1">
                  Màu: {product.color || "Không xác định"}
                </Text>
                <Text strong className="block mb-1">
                  Dung lượng: {product.storage || "Không xác định"}
                </Text>
              </div>

              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                block
                className="!rounded whitespace-nowrap"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Xem chi tiết
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedProducts;
