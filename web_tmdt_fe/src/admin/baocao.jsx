import React, { useEffect, useState } from "react";
import axios from "axios";

const Baocao = () => {
  const [currentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [summary, setSummary] = useState({
    totalUsers: 0,
    newOrders: 0,
    totalRevenue: 0,
    conversionRate: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
  });

  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, topRes, lowStockRes] = await Promise.all([
          axios.get("http://localhost:8080/api/dashboard"),
          axios.get("http://localhost:8080/api/dashboard/top-selling"),
          axios.get(
            "http://localhost:8080/api/dashboard/low-stock?page=0&size=5"
          ),
        ]);
        setSummary(summaryRes.data);
        setTopProducts(topRes.data);
        setLowStockProducts(lowStockRes.data.content);
      } catch (err) {
        console.error("Lỗi khi tải báo cáo:", err);
      }
    };
    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatPercent = (value) => `${value?.toFixed(2)}%`;

  const statsData = [
    {
      title: "Tổng số người dùng mới",
      value: summary.totalUsers,
      change: "+0%",
      icon: "fas fa-users",
      isPositive: true,
    },
    {
      title: "Tổng số đơn hàng mới",
      value: summary.newOrders,
      change: "+0%",
      icon: "fas fa-shopping-cart",
      isPositive: true,
    },
    {
      title: "Tổng doanh thu",
      value: formatCurrency(summary.totalRevenue),
      change: "+0%",
      icon: "fas fa-chart-line",
      isPositive: true,
    },
    {
      title: "Tỉ lệ chuyển đổi",
      value: formatPercent(summary.conversionRate),
      change: "+0%",
      icon: "fas fa-percentage",
      isPositive: true,
    },
    {
      title: "Đơn giao thành công",
      value: summary.deliveredOrders,
      change: "+0%",
      icon: "fas fa-check-circle",
      isPositive: true,
    },
    {
      title: "Đơn bị hủy",
      value: summary.cancelledOrders,
      change: "+0%",
      icon: "fas fa-times-circle",
      isPositive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-300">
          <div className="text-3xl font-bold text-gray-800">LongStore</div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              BÁO CÁO TỔNG HỢP THÁNG {currentMonth.toString().padStart(2, "0")}/
              {currentYear}
            </h1>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>Ngày xuất báo cáo:</div>
            <div className="font-semibold">
              {currentDate.toLocaleDateString("vi-VN")}
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            THỐNG KÊ TỔNG QUAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl text-gray-600">
                    <i className={stat.icon}></i>
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      stat.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Top Products */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              TOP 5 SẢN PHẨM BÁN CHẠY
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Top
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tên sản phẩm
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      SL bán
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Doanh thu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topProducts.map((product, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.tensp} - {product.color} - {product.storage}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {product.totalSold}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {formatCurrency(product.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Products */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              SẢN PHẨM SẮP HẾT HÀNG
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      STT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tên sản phẩm
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Còn lại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lowStockProducts.map((product, index) => {
                    const stock = product.soluong || product.totalQuantity;
                    let status = "Cảnh báo";
                    if (stock <= 5) status = "Sắp hết";
                    else if (stock <= 10) status = "Rất Thấp";
                    else if (stock <= 20) status = "Thấp";

                    return (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {product.tensp} - {product.color} - {product.storage}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                          {stock}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              status === "Rất thấp"
                                ? "bg-red-100 text-red-800"
                                : status === "Thấp"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <div>Người xuất báo cáo: Nguyễn Tiến Long</div>
              <div>Thời gian xuất: {currentDate.toLocaleString("vi-VN")}</div>
            </div>
            <div className="flex space-x-4 no-print">
              <button
                onClick={handlePrint}
                className="rounded bg-gray-600 text-white px-6 py-2 font-semibold hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <i className="fas fa-print"></i>
                <span>In báo cáo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx="true">{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body * {
            visibility: hidden;
          }

          .max-w-7xl,
          .max-w-7xl * {
            visibility: visible;
          }

          .max-w-7xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Baocao;
