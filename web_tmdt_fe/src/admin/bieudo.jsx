import axios from "axios";
import { useEffect, useState } from "react";

export const useDashboardChartData = () => {
  const [revenueData, setRevenueData] = useState(new Array(12).fill(0));
  const [statusData, setStatusData] = useState([]);
  const [userTrend, setUserTrend] = useState(new Array(12).fill(0));
  const [orderTrend, setOrderTrend] = useState(new Array(12).fill(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchChartData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [revenueRes, statusRes, userTrendRes, orderTrendRes] =
          await Promise.all([
            axios.get(
              "http://localhost:8080/api/orders/stats/revenue-by-month",
              { headers }
            ),
            axios.get("http://localhost:8080/api/orders/stats/status-count", {
              headers,
            }),
            axios.get(
              "http://localhost:8080/api/users/stats/new-users-by-month",
              { headers }
            ),
            axios.get(
              "http://localhost:8080/api/orders/stats/orders-by-month",
              { headers }
            ),
          ]);

        const rawStatus = statusRes.data;

        const formattedStatus = [
          {
            name: "Đã giao",
            value: rawStatus["Đã giao"] || 0,
            itemStyle: { color: "#10B981" },
          },
          {
            name: "Đang giao",
            value: rawStatus["Đang giao"] || 0,
            itemStyle: { color: "#0EA5E9" },
          },
          {
            name: "Chờ xác nhận",
            value: rawStatus["Chờ xác nhận"] || 0,
            itemStyle: { color: "#F59E0B" },
          },
          {
            name: "Đã hủy",
            value: rawStatus["Đã hủy"] || 0,
            itemStyle: { color: "#EF4444" },
          },
        ];

        setRevenueData(revenueRes.data);
        setStatusData(formattedStatus);
        setUserTrend(userTrendRes.data);
        setOrderTrend(orderTrendRes.data);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return { revenueData, statusData, userTrend, orderTrend, loading };
};

// Các options biểu đồ
export const getBarChartOptions = (data = []) => ({
  animation: false,
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: [
    {
      type: "category",
      data: [
        "T1",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7",
        "T8",
        "T9",
        "T10",
        "T11",
        "T12",
      ],
      axisTick: { alignWithLabel: true },
    },
  ],
  yAxis: [{ type: "value" }],
  series: [
    {
      name: "Doanh thu",
      type: "bar",
      barWidth: "60%",
      data: data.length === 12 ? data : new Array(12).fill(0),
      itemStyle: { color: "#4F46E5" },
    },
  ],
});

export const getLineChartOptions = (userData = [], orderData = []) => ({
  animation: false,
  tooltip: { trigger: "axis" },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "Người dùng mới",
      type: "line",
      stack: "Total",
      data: userData.length === 12 ? userData : new Array(12).fill(0),
      smooth: true,
      lineStyle: { width: 3, color: "#10B981" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
            { offset: 1, color: "rgba(16, 185, 129, 0.05)" },
          ],
        },
      },
    },
    {
      name: "Đơn hàng",
      type: "line",
      stack: "Total",
      data: orderData.length === 12 ? orderData : new Array(12).fill(0),
      smooth: true,
      lineStyle: { width: 3, color: "#0EA5E9" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(14, 165, 233, 0.3)" },
            { offset: 1, color: "rgba(14, 165, 233, 0.05)" },
          ],
        },
      },
    },
  ],
});

export const getPieChartOptions = (statusData = []) => ({
  animation: false,
  tooltip: { trigger: "item" },
  legend: { top: "5%", left: "center" },
  series: [
    {
      name: "Trạng thái đơn hàng",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: { show: false, position: "center" },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      labelLine: { show: false },
      data: statusData,
    },
  ],
});
