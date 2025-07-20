import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  Table,
  Typography,
  Input,
  message,
  Popconfirm,
  Modal,
  Form,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const { Search } = Input;

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchCategories = async (keyword = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/danhmuc`, {
        params: keyword ? { keyword } : {},
      });
      const data = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.tendm,
      }));
      setCategories(data);
    } catch (error) {
      message.error("Lỗi khi tải danh mục");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (value) => {
    setSearchKeyword(value);
    fetchCategories(value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/danhmuc/${id}`);
      message.success("Xoá danh mục thành công");
      fetchCategories(searchKeyword);
    } catch (error) {
      message.error("Lỗi khi xoá danh mục");
    }
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue({ tendm: record.name });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await axios.put(
          `http://localhost:8080/api/danhmuc/${editingCategory.id}`,
          null,
          { params: { tendm: values.tendm } }
        );
        message.success("Cập nhật danh mục thành công");
      } else {
        await axios.post(`http://localhost:8080/api/danhmuc`, null, {
          params: { tendm: values.tendm },
        });
        message.success("Thêm danh mục thành công");
      }
      setModalVisible(false);
      fetchCategories(searchKeyword);
    } catch (error) {
      message.error("Lỗi khi thêm/cập nhật danh mục");
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => index + 1,
    },

    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xoá danh mục này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Quản lý danh mục
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="!rounded-button cursor-pointer"
          onClick={handleAdd}
        >
          Thêm danh mục
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Search
            placeholder="Tìm kiếm danh mục..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </div>

        <Table
          dataSource={categories}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
          className="overflow-x-auto"
        />
      </Card>

      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleFormSubmit}
        okText={editingCategory ? "Cập nhật" : "Thêm"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tendm"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesManagement;
