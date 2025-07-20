import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Typography,
  Rate,
  Tag,
  Button,
  Divider,
  Card,
  List,
  Avatar,
  Pagination,
  Tabs,
  Space,
  Descriptions,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Layout from "../common/Layout";

const { Title, Text, Paragraph } = Typography;

// Tạo axiosInstance để sử dụng chung
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào mọi yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductAndVariants = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const productRes = await axiosInstance.get(`/api/variants/${id}`);
        const productData = productRes.data;

        const [variantsRes, relatedRes] = await Promise.all([
          axiosInstance.get(`/api/variants/sanpham/${productData.sanPhamId}`),
          axiosInstance.get(`/api/variants/${id}/related`),
        ]);
        const variantData = variantsRes.data;

        const images = Array.isArray(productData.images)
          ? productData.images.map((img) =>
              img.startsWith("http")
                ? img
                : `http://localhost:8080/images/products/${img}`
            )
          : productData.images
          ? [
              productData.images.startsWith("http")
                ? productData.images
                : `http://localhost:8080/images/products/${productData.images}`,
            ]
          : [];

        setProduct({
          id: productData.id || id,
          name: productData.tensp || "Unknown Product",
          rating: productData.rating || 0,
          reviewCount: productData.reviewCount || 0,
          originalPrice: productData.originalPrice || productData.gia || 0,
          discountPrice: productData.gia || 0,
          discount: productData.discount || 0,
          images: images,
          specs: {
            screen: productData.specs?.screen || "Unknown",
            cpu: productData.specs?.cpu || "Unknown",
            ram: productData.specs?.ram || "Unknown",
            storageRange:
              productData.specs?.storageRange ||
              productData.dungluong ||
              "Unknown",
            camera: productData.specs?.camera || "Unknown",
            frontCamera: productData.specs?.frontCamera || "Unknown",
            battery: productData.specs?.battery || "Unknown",
            os: productData.specs?.os || "Unknown",
          },
          description: productData.ghichu || "No description available",
          colors: [...new Set(variantData.map((v) => v.color))],
          storage: [...new Set(variantData.map((v) => v.storage))],
        });

        setVariants(variantData || []);
        setRelatedProducts(relatedRes.data || []);
        setSelectedImage(images[0]);

        if (variantData.length > 0) {
          setSelectedColor(variantData[0].color);
          setSelectedStorage(variantData[0].storage);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        message.error("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== "undefined") fetchProductAndVariants();
  }, [id]);

  useEffect(() => {
    const matched = variants.find(
      (v) => v.color === selectedColor && v.storage === selectedStorage
    );
    console.log("Biến thể khớp:", matched);
    setSelectedVariant(matched || null);
  }, [selectedColor, selectedStorage, variants]);

  const handleReviewSubmit = (values) => {
    const newReview = {
      author: "Người dùng",
      avatar: "https://via.placeholder.com/50?text=User",
      rating: values.rating || 0,
      date: new Date().toLocaleDateString("vi-VN"),
      content: values.comment || "",
    };
    setReviewList([newReview, ...reviewList]);
    setShowReviewForm(false);
    message.success("Cảm ơn bạn đã đánh giá sản phẩm!");
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Bạn cần đăng nhập để mua sản phẩm!");
      navigate("/login");
      return;
    }

    if (!selectedVariant) {
      message.error("Vui lòng chọn màu sắc và dung lượng!");
      return;
    }

    if (selectedVariant.soLuong === 0) {
      message.error("Sản phẩm đã hết hàng!");
      return;
    }

    if (quantity < 1 || quantity > selectedVariant.soLuong) {
      message.error("Số lượng không hợp lệ!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/payment/create-payment", {
        mode: "detail",
        variantId: selectedVariant.id,
        soluong: quantity,
        amount: selectedVariant.gia * quantity,
      });

      const { url: paymentUrl } = response.data;

      if (!paymentUrl) {
        message.error("Không nhận được URL thanh toán từ server!");
        return;
      }

      navigate("/thanhtoan", {
        state: {
          mode: "product",
          variantId: selectedVariant.id,
          soluong: quantity,
          paymentUrl,
          products: [
            {
              id: selectedVariant.id,
              name: product.name,
              price: selectedVariant.gia,
              soluong: quantity,
              color: selectedVariant.color,
              storage: selectedVariant.storage,
              image: selectedVariant.imageUrl,
            },
          ],
        },
      });
    } catch (error) {
      console.error("Lỗi trong handleBuyNow:", error);
      const code = error.response?.status;
      if (code === 401) {
        message.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("token");
        navigate("/login");
      } else if (code === 403) {
        message.error("Bạn không có quyền thực hiện hành động này!");
      } else if (code === 400) {
        message.error(
          `Dữ liệu không hợp lệ: ${
            error.response?.data?.message || "Vui lòng kiểm tra lại!"
          }`
        );
      } else {
        message.error("Không thể đặt hàng. Vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/login");
      return;
    }
    if (!selectedColor || !selectedStorage) {
      message.warning("Vui lòng chọn màu sắc và dung lượng!");
      return;
    }
    if (selectedVariant?.soLuong === 0) {
      message.warning("Sản phẩm đã hết hàng!");
      return;
    }
    setIsLoading(true);
    try {
      await axiosInstance.post(
        `/api/cart/${selectedVariant?.id}/add?soLuongThem=1`
      );
      message.success("Đã thêm sản phẩm vào giỏ hàng!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      message.error("Không thể thêm vào giỏ hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8 px-4 text-center">
          Đang tải...
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8 px-4 text-center">
          Sản phẩm không tìm thấy
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 text-sm text-gray-500">
            <span
              className="cursor-pointer hover:text-blue-500"
              onClick={() => (window.location.href = "/")}
            >
              Trang chủ
            </span>{" "}
            /{" "}
            <span className="cursor-pointer hover:text-blue-500 mx-1">
              Điện thoại
            </span>{" "}
            /{" "}
            <span className="cursor-pointer hover:text-blue-500 mx-1">
              Apple
            </span>{" "}
            / <span className="text-gray-700 mx-1">{product.name}</span>
          </div>
          <Row gutter={[32, 24]} className="p-6">
            <Col xs={24} md={12} lg={10}>
              <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center h-[500px] border border-gray-100">
                <img
                  src={
                    selectedVariant?.imageUrl
                      ? `http://localhost:8080/images/products/${selectedVariant.imageUrl}`
                      : product.images[0] ||
                        "https://placehold.co/500x500?text=No+Image"
                  }
                  alt={product.name}
                  className={`object-contain h-full transition-transform duration-300 hover:scale-110 ${
                    selectedVariant?.soLuong === 0 ? "opacity-50" : ""
                  }`}
                  onError={(e) =>
                    (e.target.src = "https://placehold.co/500x500?text=Error")
                  }
                />
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {product.images.map((image, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-blue-500"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.target.src = "https://placehold.co/80?text=Error")
                      }
                    />
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} md={12} lg={14}>
              <div>
                <div className="flex justify-between items-start">
                  <Title level={2} className="mb-2 text-gray-800">
                    {product.name}
                  </Title>
                  <div className="flex gap-2">
                    <Button
                      type="text"
                      icon={<HeartOutlined />}
                      className="text-gray-500 hover:text-red-500"
                    />
                    <Button
                      type="text"
                      icon={<ShareAltOutlined />}
                      className="text-gray-500 hover:text-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Rate
                    allowHalf
                    defaultValue={product.rating}
                    disabled
                    className="text-yellow-400 text-sm"
                  />
                  <Text className="ml-2 text-gray-500">
                    {product.rating} ({product.reviewCount} đánh giá)
                  </Text>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <Text className="text-2xl font-bold text-red-600">
                      {selectedVariant?.gia?.toLocaleString("vi-VN")} ₫
                    </Text>
                    <Text className="text-gray-500 line-through">
                      {product.originalPrice.toLocaleString("vi-VN")} ₫
                    </Text>
                    <Tag color="red" className="rounded-full">
                      -{product.discount}%
                    </Tag>
                  </div>
                  <Text className="text-green-600 block mt-1">
                    Trả góp chỉ từ 900.000₫/tháng
                  </Text>
                </div>
                <Divider className="my-4" />
                <div className="mb-6">
                  <Text strong className="block mb-2">
                    Màu sắc:
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        type={selectedColor === color ? "primary" : "default"}
                        onClick={() => setSelectedColor(color)}
                        className={`!rounded-full whitespace-nowrap ${
                          selectedColor === color
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <Text strong className="block mb-2">
                    Dung lượng:
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {product.storage.map((storage) => (
                      <Button
                        key={storage}
                        type={
                          selectedStorage === storage ? "primary" : "default"
                        }
                        onClick={() => setSelectedStorage(storage)}
                        className={`!rounded-full whitespace-nowrap ${
                          selectedStorage === storage
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {storage}
                      </Button>
                    ))}
                  </div>
                </div>
                <Divider className="my-4" />
                <Paragraph className="text-gray-600">
                  {product.description}
                </Paragraph>
                <div className="mb-4">
                  <Text strong className="block mb-2">
                    Số lượng:
                  </Text>
                  <Input
                    type="number"
                    min={1}
                    max={selectedVariant?.soLuong || 10}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ width: 100 }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    type="primary"
                    size="large"
                    disabled={selectedVariant?.soLuong === 0}
                    loading={isLoading}
                    icon={<ThunderboltOutlined />}
                    danger
                    className="flex-1 h-12 text-base font-medium !rounded-full"
                    onClick={handleBuyNow}
                  >
                    Mua ngay
                  </Button>
                  <Button
                    size="large"
                    disabled={selectedVariant?.soLuong === 0}
                    icon={<ShoppingCartOutlined />}
                    className="flex-1 h-12 border-red-500 text-red-500 hover:bg-red-50 !rounded-full"
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <Card className="bg-gray-50 mb-6">
                  <Title level={5} className="mb-3">
                    Ưu đãi đặc biệt
                  </Title>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Giảm ngay 500.000₫ khi thanh toán qua VNPay</li>
                    <li>Trả góp 0% qua thẻ tín dụng</li>
                    <li>Tặng PMH 500.000₫ mua Apple Care+</li>
                    <li>Giảm 50% khi mua kèm phụ kiện Apple</li>
                  </ul>
                </Card>
              </div>
            </Col>
          </Row>
          <div className="px-6 pb-8">
            <Tabs
              defaultActiveKey="1"
              size="large"
              items={[
                {
                  key: "1",
                  label: "Thông số kỹ thuật",
                  children: (
                    <Card className="mt-4">
                      <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                      >
                        <Descriptions.Item label="Màn hình">
                          {product.specs.screen}
                        </Descriptions.Item>
                        <Descriptions.Item label="Hệ điều hành">
                          {product.specs.os}
                        </Descriptions.Item>
                        <Descriptions.Item label="Chip xử lý">
                          {product.specs.cpu}
                        </Descriptions.Item>
                        <Descriptions.Item label="RAM">
                          {product.specs.ram}
                        </Descriptions.Item>
                        <Descriptions.Item label="Bộ nhớ trong">
                          {product.specs.storageRange}
                        </Descriptions.Item>
                        <Descriptions.Item label="Camera sau">
                          {product.specs.camera}
                        </Descriptions.Item>
                        <Descriptions.Item label="Camera trước">
                          {product.specs.frontCamera}
                        </Descriptions.Item>
                        <Descriptions.Item label="Pin">
                          {product.specs.battery}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  ),
                },
                {
                  key: "2",
                  label: `Đánh giá (${product.reviewCount})`,
                  children: (
                    <div className="mt-4">
                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <Row gutter={24}>
                          <Col xs={24} md={8}>
                            <div className="text-center">
                              <Title level={2} className="mb-0 text-red-600">
                                {product.rating}/5
                              </Title>
                              <Rate
                                allowHalf
                                value={product.rating}
                                disabled
                                className="text-yellow-400 my-2"
                              />
                              <Text className="block text-gray-500">
                                {product.reviewCount} đánh giá
                              </Text>
                            </div>
                          </Col>
                          <Col xs={24} md={16}>
                            <div className="space-y-2 mt-4 md:mt-0">
                              {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center">
                                  <Text className="w-8">{star} ★</Text>
                                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2.5">
                                    <div
                                      className="bg-yellow-400 h-2.5 rounded-full"
                                      style={{
                                        width:
                                          star === 5
                                            ? "70%"
                                            : star === 4
                                            ? "20%"
                                            : star === 3
                                            ? "7%"
                                            : star === 2
                                            ? "2%"
                                            : "1%",
                                      }}
                                    />
                                  </div>
                                  <Text className="w-8 text-right text-gray-500">
                                    {star === 5
                                      ? 70
                                      : star === 4
                                      ? 20
                                      : star === 3
                                      ? 7
                                      : star === 2
                                      ? 2
                                      : 1}
                                    %
                                  </Text>
                                </div>
                              ))}
                            </div>
                            <Button
                              type="primary"
                              onClick={() => setShowReviewForm(true)}
                              className="mt-4 !rounded-full whitespace-nowrap"
                            >
                              Viết đánh giá
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      <Modal
                        title="Đánh giá sản phẩm"
                        open={showReviewForm}
                        onCancel={() => setShowReviewForm(false)}
                        footer={null}
                      >
                        <Form
                          name="reviewForm"
                          onFinish={handleReviewSubmit}
                          layout="vertical"
                          className="mt-4"
                        >
                          <Form.Item
                            name="rating"
                            label="Đánh giá của bạn"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn đánh giá",
                              },
                            ]}
                          >
                            <Rate className="text-yellow-400" />
                          </Form.Item>
                          <Form.Item
                            name="comment"
                            label="Nhận xét"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập nhận xét",
                              },
                            ]}
                          >
                            <Input.TextArea
                              rows={4}
                              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                              maxLength={500}
                              showCount
                            />
                          </Form.Item>
                          <Form.Item className="mb-0 text-right">
                            <Space>
                              <Button onClick={() => setShowReviewForm(false)}>
                                Hủy
                              </Button>
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="!rounded-full"
                              >
                                Gửi đánh giá
                              </Button>
                            </Space>
                          </Form.Item>
                        </Form>
                      </Modal>
                      <List
                        itemLayout="vertical"
                        dataSource={reviewList}
                        renderItem={(item) => (
                          <List.Item>
                            <div className="border-b border-gray-100 pb-4">
                              <div className="flex items-start">
                                <Avatar src={item.avatar} size={48} />
                                <div className="ml-4 flex-1">
                                  <div className="flex justify-between items-center">
                                    <Text strong>{item.author}</Text>
                                    <Text className="text-gray-500 text-sm">
                                      {item.date}
                                    </Text>
                                  </div>
                                  <Rate
                                    disabled
                                    defaultValue={item.rating}
                                    className="text-yellow-400 text-sm my-1"
                                  />
                                  <Paragraph className="text-gray-700 mt-2">
                                    {item.content}
                                  </Paragraph>
                                </div>
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                      <div className="mt-6 text-center">
                        <Pagination defaultCurrent={1} total={50} />
                      </div>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: "Sản phẩm tương tự",
                  children: (
                    <div className="mt-4">
                      <Row gutter={[16, 24]}>
                        {relatedProducts.map((item) => (
                          <Col xs={24} sm={12} md={6} key={item.id}>
                            <Card
                              hoverable
                              cover={
                                <img
                                  src={`http://localhost:8080/images/products/${
                                    item.imageUrl || "default.png"
                                  }`}
                                  alt={item.tensp}
                                  className="p-4 object-contain h-48"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://placehold.co/220x220?text=No+Image";
                                  }}
                                />
                              }
                              className="text-center cursor-pointer !rounded-lg"
                              onClick={() => navigate(`/product/${item.id}`)}
                            >
                              <Card.Meta
                                title={item.tensp}
                                description={
                                  <div>
                                    <Text className="text-red-600 font-medium block">
                                      {item.gia?.toLocaleString("vi-VN")} ₫
                                    </Text>
                                    <Rate
                                      disabled
                                      defaultValue={item.rating || 4.5}
                                      className="text-yellow-400 text-xs mt-1"
                                    />
                                  </div>
                                }
                              />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
