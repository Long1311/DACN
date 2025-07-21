import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Button,
  Spin,
  message,
  Badge,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Layout from "../common/Layout";
import axios from "axios";

const { Title, Text } = Typography;

const DiscountPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSafeImageUrl = (url) => {
    try {
      return url && new URL(url)
        ? url
        : "https://via.placeholder.com/200?text=No+Image";
    } catch {
      return "https://via.placeholder.com/200?text=No+Image";
    }
  };

  useEffect(() => {
    fetchDiscountProducts();
  }, []);

  const fetchDiscountProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/variants/discount"
      );
      const data = Array.isArray(res.data) ? res.data : [];

      const formatted = data.map((product) => ({
        ...product,
        imageUrl: product.imageUrl
          ? product.imageUrl.startsWith("http")
            ? product.imageUrl
            : `http://localhost:8080/images/products/${product.imageUrl}`
          : "https://via.placeholder.com/200?text=No+Image",
      }));

      setProducts(formatted);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm khuyến mãi:", error);
      message.error("Không thể tải sản phẩm khuyến mãi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-10 px-6 bg-gray-50 min-h-screen">
        {loading ? (
          <div className="text-center mt-20">
            <Spin size="large" />
          </div>
        ) : products.length > 0 ? (
          <Row gutter={[24, 24]}>
            {products.map((product) => (
              <Col xs={12} sm={12} md={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <div className="pt-4 px-4 relative">
                      {product.discount > 0 ? (
                        <Badge.Ribbon
                          text={`-${product.discount}%`}
                          color="red"
                        >
                          <img
                            alt={product.tensp || "Product"}
                            src={getSafeImageUrl(product.imageUrl)}
                            className="h-[200px] object-contain mx-auto"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/200?text=Error")
                            }
                          />
                        </Badge.Ribbon>
                      ) : (
                        <img
                          alt={product.tensp || "Product"}
                          src={getSafeImageUrl(product.imageUrl)}
                          className="h-[200px] object-contain mx-auto"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/200?text=Error")
                          }
                        />
                      )}
                    </div>
                  }
                  className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="flex-1">
                    <Title level={5} className="!mb-1 line-clamp-2 h-12">
                      {product.tensp || "Tên sản phẩm không xác định"}
                    </Title>
                    <div className="mb-2">
                      <Text className="text-red-600 font-bold text-lg">
                        {typeof product.gia === "number"
                          ? product.gia.toLocaleString("vi-VN") + " ₫"
                          : "Giá không xác định"}
                      </Text>
                      {product.originalPrice && (
                        <Text className="text-gray-400 line-through text-sm ml-2">
                          {product.originalPrice.toLocaleString("vi-VN") + " ₫"}
                        </Text>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      <Rate
                        disabled
                        value={product.rating || 0}
                        allowHalf
                        className="text-yellow-400 text-sm"
                      />
                      <Text className="text-gray-500 text-xs ml-2">
                        ({product.review_count || 0})
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
        ) : (
          <div className="text-center text-lg text-gray-600">
            Không có sản phẩm khuyến mãi nào.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DiscountPage;
