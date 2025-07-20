import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  Table,
  Typography,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import {
  SearchOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Bạn chưa đăng nhập hoặc thiếu quyền.");
      return;
    }

    setLoading(true);
    axios
      .get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.filter(
          (u) => u.quyentruycap === "user" || u.quyentruycap === "ROLE_USER"
        );

        setUsers(
          data.map((u, i) => ({
            key: i + 1,
            id: `ND${u.id.toString().padStart(3, "0")}`,
            rawId: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            gender:
              u.gender === "male"
                ? "Nam"
                : u.gender === "female"
                ? "Nữ"
                : "Khác",
            status: u.enabled ? "Mở" : "Đã khóa",
            enabled: u.enabled,
          }))
        );
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        const code = err.response?.status;
        if (code === 403 || code === 401) {
          message.error("Bạn không có quyền truy cập danh sách người dùng.");
        } else {
          message.error("Không thể tải danh sách người dùng.");
        }
      })
      .finally(() => setLoading(false));
  };

  const toggleUserStatus = (user) => {
    const token = localStorage.getItem("token");
    const isLocking = user.enabled;
    const actionText = isLocking ? "khóa" : "mở khóa";

    Modal.confirm({
      title: `Xác nhận ${actionText} người dùng`,
      content: `Bạn có chắc muốn ${actionText} ${user.name}?`,
      okText: "Xác nhận",
      okType: isLocking ? "danger" : "primary",
      cancelText: "Hủy",
      onOk: () => {
        axios
          .put(
            `http://localhost:8080/api/users/${isLocking ? "lock" : "unlock"}/${
              user.rawId
            }`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            message.success(
              `${
                actionText.charAt(0).toUpperCase() + actionText.slice(1)
              } thành công!`
            );
            fetchUsers();
          })
          .catch((err) => {
            console.error("Lỗi khi đổi trạng thái:", err);
            message.error("Không thể đổi trạng thái người dùng.");
          });
      },
    });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (statusFilter === "all" || u.status === statusFilter)
  );

  const userColumns = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <span style={{ color: status === "Mở" ? "#10B981" : "#EF4444" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={record.enabled ? <LockOutlined /> : <UnlockOutlined />}
          className="!rounded-button"
          onClick={() => toggleUserStatus(record)}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Quản lý người dùng
        </Title>
      </div>

      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm người dùng..."
            allowClear
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            className="!rounded-button"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 160 }}
            className="!rounded-button"
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="Mở">Đang hoạt động</Option>
            <Option value="Đã khóa">Đã khóa</Option>
          </Select>
        </div>

        <Table
          dataSource={filteredUsers}
          columns={userColumns}
          loading={loading}
          pagination={{ pageSize: 10 }}
          className="overflow-x-auto"
        />
      </Card>
    </div>
  );
};

export default UsersManagement;
