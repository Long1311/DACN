import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Table, Tabs, Typography, Input, DatePicker } from "antd";
import {
  SearchOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const formatted = response.data.map((order) => {
          const dateObj = new Date(order.ngaydat);
          return {
            key: order.id,
            id: "DH" + String(order.id).padStart(3, "0"),
            customer: `User ${order.userId}`,
            date: dateObj.toLocaleDateString("vi-VN"),
            rawDate: dateObj,
            total: `${order.thanhtien.toLocaleString("vi-VN")}₫`,
            status: convertStatus(order.trangthai),
          };
        });
        setOrders(formatted);
        setFilteredOrders(formatted);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      });
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchText, dateRange, orders]);

  const convertStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "SHIPPING":
        return "Đang giao";
      case "COMPLETED":
        return "Đã giao";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const handleFilter = () => {
    let filtered = [...orders];

    if (searchText.trim() !== "") {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(lowerSearch) ||
          order.customer.toLowerCase().includes(lowerSearch)
      );
    }

    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      filtered = filtered.filter((order) => {
        const date = order.rawDate;
        return (
          date >= start.startOf("day").toDate() &&
          date <= end.endOf("day").toDate()
        );
      });
    }

    setFilteredOrders(filtered);
  };

  const orderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          "Đã giao": "#10B981",
          "Đang giao": "#0EA5E9",
          "Chờ xác nhận": "#F59E0B",
          "Đã hủy": "#EF4444",
        };
        return (
          <span style={{ color: colorMap[status] || "#000" }}>{status}</span>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="text"
            icon={<SyncOutlined />}
            className="!rounded-button"
            disabled={["Đã giao", "Đã hủy"].includes(record.status)}
            onClick={() => handleUpdateStatus(record)}
          />
          <Button
            type="text"
            icon={<CloseCircleOutlined />}
            danger
            className="!rounded-button"
            disabled={["Đã giao", "Đã hủy"].includes(record.status)}
            onClick={() => handleCancelOrder(record)}
          />
        </>
      ),
    },
  ];

  const handleUpdateStatus = (record) => {
    const nextStatus = {
      "Chờ xác nhận": "SHIPPING",
      "Đang giao": "COMPLETED",
    }[record.status];
    if (!nextStatus) return;

    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:8080/api/orders/${record.key}/status`,
        { status: nextStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.key === record.key
              ? { ...order, status: convertStatus(nextStatus) }
              : order
          )
        );
      })
      .catch((error) => console.error("Lỗi cập nhật trạng thái:", error));
  };

  const handleCancelOrder = (record) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:8080/api/orders/${record.key}/status`,
        { status: "CANCELLED" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.key === record.key
              ? { ...order, status: convertStatus("CANCELLED") }
              : order
          )
        );
      })
      .catch((error) => console.error("Lỗi khi hủy đơn hàng:", error));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Quản lý đơn hàng
        </Title>
      </div>
      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm mã đơn hoặc khách hàng..."
            allowClear
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="!rounded-button"
          />
          <RangePicker
            className="!rounded-button"
            onChange={(dates) => setDateRange(dates || [])}
          />
        </div>

        <Tabs defaultActiveKey="all">
          {["Tất cả", "Chờ xác nhận", "Đang giao", "Đã giao", "Đã hủy"].map(
            (tab) => (
              <Tabs.TabPane key={tab} tab={tab}>
                <Table
                  dataSource={
                    tab === "Tất cả"
                      ? filteredOrders
                      : filteredOrders.filter((o) => o.status === tab)
                  }
                  columns={orderColumns}
                  pagination={{ pageSize: 10 }}
                />
              </Tabs.TabPane>
            )
          )}
        </Tabs>
      </Card>
    </div>
  );
};

export default OrdersManagement;
