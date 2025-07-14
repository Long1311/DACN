import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Button,
  Badge,
  Typography,
  Rate,
  message,
  Spin,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Layout from "../common/Layout";

const { Title, Text } = Typography;

const ProductList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/variants/search?loaiId=${categoryId}`
        );
        const data = response.data;

        const formattedProducts = data.map((item) => ({
          id: item.id,
          tensp: item.tensp,
          gia: item.gia,
          originalPrice: item.originalPrice,
          imageUrl: item.imageUrl
            ? item.imageUrl.startsWith("http")
              ? item.imageUrl
              : `http://localhost:8080/images/products/${item.imageUrl}`
            : `https://via.placeholder.com/200?text=${item.tensp || "Product"}`,
          color: item.color,
          storage: item.storage,
          rating:
            typeof item.rating === "number" && item.rating >= 0
              ? item.rating
              : 0,
          reviewCount:
            typeof item.reviewCount === "number" && item.reviewCount >= 0
              ? item.reviewCount
              : 0,
          discount: item.discount || 0,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm theo danh mục:", error);
        message.error("Không thể tải danh sách sản phẩm. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen bg-gray-50 py-8 px-4 text-center">
          <Spin size="large" />
        </div>
      ) : products.length === 0 ? (
        <div className="min-h-screen bg-gray-50 py-8 px-4 text-center">
          Không có sản phẩm
        </div>
      ) : (
        <div className="mb-12 pt-10">
          <Row gutter={[24, 24]} justify="center">
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
                            alt={product.tensp}
                            src={product.imageUrl}
                            className="h-[200px] object-contain mx-auto"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/200?text=Error")
                            }
                          />
                        </Badge.Ribbon>
                      ) : (
                        <img
                          alt={product.tensp}
                          src={product.imageUrl}
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
                      {typeof product.originalPrice === "number" &&
                        product.originalPrice > product.gia && (
                          <Text className="text-gray-400 line-through text-sm ml-2">
                            {product.originalPrice.toLocaleString("vi-VN")} ₫
                          </Text>
                        )}
                    </div>

                    <div className="flex items-center mb-2">
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={product.rating}
                        style={{ color: "#d9d9d9" }} // xám nếu 0
                        className="text-sm"
                      />
                      <Text className="text-gray-500 text-xs ml-2">
                        ({product.reviewCount})
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
      )}
    </Layout>
  );
};

export default ProductList;
