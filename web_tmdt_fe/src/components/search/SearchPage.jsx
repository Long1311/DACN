import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Input, Empty } from "antd";

const { Search } = Input;

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const key = params.get("keyword");
    setKeyword(key || "");
    if (key) {
      fetchSearchResults(key);
    }
  }, [location.search]);

  const fetchSearchResults = async (key) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/variants/search?keyword=${key}&page=0&size=30`
      );
      setProducts(response.data.content || []);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (value) => {
    if (!value) return;
    navigate(`/search?keyword=${encodeURIComponent(value)}`);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const getImageUrl = (images) => {
    const img =
      Array.isArray(images) && images.length > 0
        ? images[0]
        : typeof images === "string"
        ? images
        : null;

    return img?.startsWith("http")
      ? img
      : `http://localhost:8080/images/products/${img || "placeholder.jpg"}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Kết quả tìm kiếm
        </h1>

        <div className="max-w-md mx-auto mb-8">
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            enterButton="Tìm kiếm"
            size="large"
            defaultValue={keyword}
            onSearch={onSearch}
          />
        </div>

        {products.length === 0 && !loading ? (
          <Empty description="Không tìm thấy sản phẩm" />
        ) : (
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.variantId}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.tensp}
                      src={getImageUrl(product.images)}
                      className="h-56 object-cover rounded"
                    />
                  }
                  onClick={() => navigate(`/product/${product.variantId}`)}
                >
                  <Card.Meta
                    title={
                      <div className="font-semibold text-base">
                        {product.tensp} - {product.color} - {product.storage}
                      </div>
                    }
                    description={
                      <div className="text-blue-600 font-bold mt-1">
                        {formatCurrency(product.gia)}
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
