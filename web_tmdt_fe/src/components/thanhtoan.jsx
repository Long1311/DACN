import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import Layout from "./common/Layout";

const ThanhToan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const vnpCode = params.get("vnp_ResponseCode");

    if (vnpCode) {
      const token = localStorage.getItem("token");

      fetch(
        "http://localhost:8080/api/payment/vnpay-return" + location.search,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            message.success("🎉 Thanh toán thành công!");
            localStorage.setItem("cartCount", "0");
            sessionStorage.removeItem("checkoutProducts");
            window.dispatchEvent(new Event("cart-updated"));
            setTimeout(() => navigate("/"), 3000);
          } else {
            message.error("❌ Thanh toán thất bại.");
          }
        })
        .catch((err) => {
          console.error("Xác nhận thanh toán thất bại:", err);
          message.error("❌ Đã xảy ra lỗi.");
        })
        .finally(() => {
          setTimeout(() => {
            window.history.replaceState(null, "", "/thanhtoan");
          }, 2000);
        });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    let list = location.state?.products;
    if (!list || list.length === 0) {
      const stored = sessionStorage.getItem("checkoutProducts");
      if (stored) list = JSON.parse(stored);
    }

    if (list && list.length > 0) {
      setProducts(list);
      const totalAmount = list.reduce(
        (sum, p) => sum + Number(p.price) * Number(p.soluong),
        0
      );
      setTotal(totalAmount);
    } else {
      alert("Không có sản phẩm để thanh toán.");
      navigate("/cart");
    }

    const fetchShippingInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Lỗi khi lấy thông tin người dùng");

        const data = await res.json();
        setShippingInfo({
          name: data.name || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error("Lỗi khi tải thông tin giao hàng:", error);
      }
    };

    fetchShippingInfo();
  }, [location.state, navigate]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const handlePayment = async () => {
    const existingUrl = location.state?.paymentUrl;
    if (existingUrl) {
      window.location.href = existingUrl;
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const mode = location.state?.mode || "cart";
      const variantId = location.state?.variantId;
      const soluong = location.state?.soluong;

      const res = await fetch(
        `http://localhost:8080/api/payment/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: total,
            mode,
            variantId,
            soluong,
          }),
        }
      );

      if (!res.ok) throw new Error("Tạo đơn hàng thất bại");

      const data = await res.json();
      const paymentUrl = data.url;

      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      message.error("Lỗi thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Thanh Toán Đơn Hàng
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Thông tin giao hàng */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Thông Tin Giao Hàng
                </h2>
                <div className="text-gray-700 space-y-2 text-sm">
                  <p>
                    <strong>Họ và tên:</strong> {shippingInfo.name}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {shippingInfo.phone}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {shippingInfo.address}
                  </p>
                </div>
              </div>

              {/* Chi tiết đơn hàng */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Chi Tiết Đơn Hàng
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 font-semibold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-2 text-left">Sản phẩm</th>
                        <th className="px-4 py-2">Phân loại</th>
                        <th className="px-4 py-2 text-right">Đơn giá</th>
                        <th className="px-4 py-2 text-center">SL</th>
                        <th className="px-4 py-2 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  item.image?.startsWith("http")
                                    ? item.image
                                    : `http://localhost:8080/images/products/${item.image}`
                                }
                                onError={(e) => {
                                  e.target.src =
                                    "https://placehold.co/100x100?text=Image";
                                }}
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded border"
                              />
                              <span className="font-medium">
                                {item.name?.split(" - ")[0]}
                              </span>
                            </div>
                          </td>
                          <td className="text-center">
                            {item.phanloai ||
                              `${item.color || ""} - ${item.storage || ""}`}
                          </td>
                          <td className="text-right">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="text-center">{item.soluong}</td>
                          <td className="text-right font-semibold">
                            {formatCurrency(item.price * item.soluong)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={4}
                          className="text-right font-semibold px-4 py-4"
                        >
                          Tổng thanh toán:
                        </td>
                        <td className="text-right font-bold text-lg text-black px-4 py-4">
                          {formatCurrency(total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Thanh toán */}
            <div className="lg:col-span-1">
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
                      Thanh toán an toàn, xác nhận ngay
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Tổng cộng</p>
                      <p>{formatCurrency(total)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Đã bao gồm VAT
                    </p>
                  </div>

                  <div className="mt-6">
                    {isLoading ? (
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500 border-gray-200 mb-4"></div>
                        <p className="text-gray-600">
                          Đang chuyển hướng đến VNPay...
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={handlePayment}
                        className="w-full bg-[#1890ff] border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                      >
                        <i className="fas fa-wallet mr-2"></i>
                        Thanh toán bằng VNPay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThanhToan;
