import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/variants/discount")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];

        const formatted = data.map((product) => {
          const imageUrl = product.imageUrl?.startsWith("http")
            ? product.imageUrl
            : `http://localhost:8080/images/products/${product.imageUrl}`;

          return {
            ...product,
            imageUrl:
              imageUrl ||
              `https://via.placeholder.com/200?text=${
                product.tensp || "Flash Sale"
              }`,
            discount:
              typeof product.discount === "number" ? product.discount : 0,
            rating: typeof product.rating === "number" ? product.rating : 0,
            reviewCount:
              typeof product.reviewCount === "number" ? product.reviewCount : 0,
          };
        });
        const filtered = formatted.filter((product) => !product.disabled);
        setProducts(filtered);
      })
      .catch((error) => {
        console.error("Error fetching flash sale products:", error);
        message.error("Không thể tải danh sách flash sale.");
      })
      .finally(() => setLoading(false));

    // Countdown timer setup
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);
    const initialDiff = Math.max(0, Math.floor((endTime - now) / 1000));

    setTimeLeft({
      hours: Math.floor(initialDiff / 3600),
      minutes: Math.floor((initialDiff % 3600) / 60),
      seconds: initialDiff % 60,
    });

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
              clearInterval(timer);
              return { hours: 0, minutes: 0, seconds: 0 };
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
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
        Không có sản phẩm flash sale
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <Title level={2} className="mb-0">
          Flash Sale
        </Title>
        <div className="flex items-center space-x-2">
          {["hours", "minutes", "seconds"].map((unit, idx) => (
            <React.Fragment key={unit}>
              <div className="bg-red-600 text-white px-3 py-1 rounded-md">
                <span className="font-mono">
                  {timeLeft[unit].toString().padStart(2, "0")}
                </span>
              </div>
              {idx < 2 && <span>:</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Row gutter={[24, 24]}>
        {products.slice(0, 8).map((product) => (
          <Col xs={12} sm={12} md={6} key={product.id}>
            <Card
              hoverable
              cover={
                <div className="pt-4 px-4 relative">
                  {product.discount > 0 ? (
                    <Badge.Ribbon text={`-${product.discount}%`} color="red">
                      <img
                        alt={product.tensp || "Flash Sale Product"}
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
                      alt={product.tensp || "Flash Sale Product"}
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
                <Title level={5} className="!mb-1 line-clamp-2 h-10">
                  {product.tensp || "Tên sản phẩm không xác định"}
                </Title>
                <div className="mb-2">
                  <Text className="text-red-600 font-bold text-lg">
                    {typeof product.gia === "number"
                      ? product.gia.toLocaleString("vi-VN") + " ₫"
                      : "Giá không xác định"}
                  </Text>
                  {product.discount > 0 && product.originalPrice && (
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
                    style={{ color: product.rating ? "#fadb14" : "#d9d9d9" }}
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

export default FlashSale;
