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
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const { Search } = Input;

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const filtered = res.data.filter(
          (user) =>
            user.quyentruycap === "user" || user.quyentruycap === "ROLE_USER"
        );

        const mapped = filtered.map((user, index) => ({
          key: index + 1,
          id: `ND${user.id.toString().padStart(3, "0")}`,
          name: user.name,
          email: user.email,
          phone: user.phone,
          gender:
            user.gender === "male"
              ? "Nam"
              : user.gender === "female"
              ? "Nữ"
              : "Khác",
          status: "Hoạt động",
        }));

        setUsers(mapped);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          message.error("Bạn không có quyền truy cập danh sách người dùng.");
        } else {
          message.error("Không thể tải danh sách người dùng.");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleEdit = (user) => {
    message.info(`Chỉnh sửa: ${user.name}`);
    // TODO: Hiển thị modal chỉnh sửa
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: `Xác nhận xoá người dùng`,
      content: `Bạn có chắc muốn xoá ${user.name}?`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        const token = localStorage.getItem("token");
        axios
          .delete(
            `http://localhost:8080/api/users/${user.id.replace("ND", "")}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            message.success("Xoá thành công!");
            fetchUsers();
          })
          .catch((err) => {
            console.error("Lỗi khi xoá người dùng:", err);
            message.error("Không thể xoá người dùng.");
          });
      },
    });
  };

  const userColumns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text>
          <span
            style={{ color: status === "Hoạt động" ? "#10B981" : "#EF4444" }}
          >
            {status}
          </span>
        </Text>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            className="!rounded-button cursor-pointer whitespace-nowrap"
            onClick={() => handleDelete(record)}
          />
        </Space>
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
          <Search
            placeholder="Tìm kiếm người dùng..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
            className="!rounded-button"
            onSearch={(value) => {
              // TODO: Thêm filter hoặc gọi API search
              message.info(`Tìm: ${value}`);
            }}
          />
          <Space>
            <Button
              icon={<FilterOutlined />}
              className="!rounded-button cursor-pointer whitespace-nowrap"
            >
              Lọc
            </Button>
          </Space>
        </div>

        <Table
          dataSource={users}
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
