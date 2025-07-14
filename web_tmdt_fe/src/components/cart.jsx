import React, { useState, useEffect } from "react";
import {
  Radio,
  InputNumber,
  Checkbox,
  Button,
  Badge,
  message,
  Spin,
} from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "./common/Layout";

const Cart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [totalPrice, setTotalPrice] = useState(0);
  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchCartItems();
    } else {
      setLoading(false);
      message.warning("Vui lòng đăng nhập để xem giỏ hàng!");
    }
  }, [token]);

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const responseCode = query.get("vnp_ResponseCode");

    if (!responseCode) return;

    const confirmPayment = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/payment/vnpay-return?${location.search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.status === "success") {
          message.success("🎉 Thanh toán thành công!");
          await fetchCartItems();
        } else if (data.status === "fail") {
          message.error("❌ Thanh toán thất bại!");
        }
      } catch (err) {
        message.error("Lỗi khi xác minh giao dịch VNPay.");
      } finally {
        // Xóa query string sau 2 giây
        setTimeout(() => {
          window.history.replaceState(null, "", "/cart");
        }, 2000);
      }
    };

    confirmPayment();
  }, [location.search, token]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Không thể lấy giỏ hàng (Status: ${response.status}) - ${errorText}`
        );
      }

      const data = await response.json();
      const mappedProducts = Array.isArray(data.cartItems)
        ? data.cartItems.map((item) => ({
            id: item.id,
            name: item.tensp || "",
            variantName: `${item.color || ""} - ${item.storage || ""}`,
            price: item.gia || 0,
            soluong: item.soluong || 1,
            images: item.image
              ? [`http://localhost:8080/images/products/${item.image}`]
              : ["https://placehold.co/150x150?text=Image"],
            selected: item.selected !== false,
            variantName: item.variantName || "", // nếu bạn cần dùng riêng tên biến thể
          }))
        : [];

      setProducts(mappedProducts);
      localStorage.setItem("cartCount", mappedProducts.length);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      message.error("Lỗi khi tải giỏ hàng: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const total = products
      .filter((product) => product.selected)
      .reduce(
        (sum, product) => sum + (product.price * product.soluong || 0),
        0
      );
    setTotalPrice(total);
  };

  const checkAllSelected = () => {
    setAllSelected(products.every((product) => product.selected));
  };

  const handleSoluongChange = async (id, value) => {
    if (value === null || value < 1) return;
    try {
      await fetch(
        `http://localhost:8080/api/cart/update?cartItemId=${id}&soluong=${value}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, soluong: value } : product
        )
      );
    } catch (error) {
      message.error("Lỗi khi cập nhật số lượng: " + error.message);
    }
  };

  const handleSelectProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    try {
      await fetch(
        `http://localhost:8080/api/cart/update?cartItemId=${id}&selected=${!product.selected}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, selected: !product.selected }
            : product
        )
      );
    } catch (error) {
      message.error("Lỗi khi chọn sản phẩm: " + error.message);
    }
  };

  const handleSelectAll = async (e) => {
    const { checked } = e.target;
    setAllSelected(checked);
    try {
      await Promise.all(
        products.map((product) =>
          fetch(
            `http://localhost:8080/api/cart/update?cartItemId=${product.id}&selected=${checked}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) => ({ ...product, selected: checked }))
      );
    } catch (error) {
      message.error("Lỗi khi chọn tất cả: " + error.message);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/cart/remove?cartItemId=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("cartCount", updatedProducts.length);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm: " + error.message);
    }
  };

  const handleCheckout = async () => {
    const selectedProducts = products.filter((product) => product.selected);

    if (selectedProducts.length === 0) {
      message.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    const checkoutProducts = selectedProducts.map((p) => ({
      ...p,
      image: p.images?.[0] || "", // ✅ Truyền ảnh đầu tiên
      color: p.variantName?.split(" - ")[1] || "", // ✅ Tách color
      storage: p.variantName?.split(" - ")[2] || "", // ✅ Tách storage
      phanloai:
        p.variantName?.split(" - ")[1] && p.variantName?.split(" - ")[2]
          ? `${p.variantName?.split(" - ")[1]} - ${
              p.variantName?.split(" - ")[2]
            }`
          : "", // ✅ Tạo phân loại hiển thị
    }));

    sessionStorage.setItem(
      "checkoutProducts",
      JSON.stringify(checkoutProducts)
    );
    sessionStorage.setItem("checkoutPaymentMethod", paymentMethod);

    navigate("/thanhtoan", {
      state: {
        products: checkoutProducts,
        paymentMethod: paymentMethod,
      },
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    calculateTotal();
    checkAllSelected();
  }, [products]);

  if (loading)
    return (
      <Layout>
        <div className="text-center py-10">
          <Spin size="large" />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Giỏ hàng
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Checkbox
                      checked={allSelected}
                      onChange={handleSelectAll}
                      className="mr-3"
                    />
                    <h2 className="text-xl font-semibold">
                      Tất cả sản phẩm ({products.length})
                    </h2>
                  </div>
                  <Badge
                    count={products.filter((p) => p.selected).length}
                    showZero
                  >
                    <ShoppingCartOutlined className="text-2xl text-blue-600" />
                  </Badge>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingCartOutlined className="text-5xl text-gray-300 mb-3" />
                    <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center border-b pb-6"
                      >
                        <Checkbox
                          checked={product.selected}
                          onChange={() => handleSelectProduct(product.id)}
                          className="mr-4"
                        />
                        <div className="flex flex-1 items-center space-x-4">
                          <div className="w-20 h-20 overflow-hidden rounded-md">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://placehold.co/150x150?text=Image";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-800">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.variantName}
                            </p>

                            <p className="mt-1 text-lg font-semibold text-blue-600">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-6">
                            <InputNumber
                              min={1}
                              max={10}
                              value={product.soluong}
                              onChange={(value) =>
                                handleSoluongChange(product.id, value)
                              }
                              className="w-20"
                            />
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => handleRemoveProduct(product.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-6">Tổng thanh toán</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span>
                      {totalPrice > 0 ? formatCurrency(0) : formatCurrency(0)}
                    </span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">
                        {formatCurrency(totalPrice > 0 ? totalPrice + 0 : 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Phương Thức Thanh Toán
                  </h2>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500 to-red-300 border border-blue-100 flex items-start gap-4 text-white">
                    <img
                      src="http://localhost:8080/images/logo_vnpay.jpg"
                      alt="VNPay"
                      className="h-10 w-10 object-contain"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/40x40?text=VNPay";
                      }}
                    />
                    <div>
                      <p className="font-medium text-gray-900">VNPay</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Thanh toán an toàn, xác nhận trong vài giây
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleCheckout}
                  disabled={totalPrice === 0}
                  className="h-12 text-base font-medium"
                >
                  Đặt hàng ngay
                </Button>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Bằng việc tiến hành thanh toán, bạn đồng ý với</p>
                  <p className="mt-1">
                    <a href="#" className="text-blue-600 hover:underline">
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Chính sách bảo mật
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
