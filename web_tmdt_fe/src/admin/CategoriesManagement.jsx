import React from 'react';
import { Button, Card, Space, Table, Typography, Input } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

const categoryData = [
  {
    key: '1',
    id: 'DM001',
    name: 'Laptop',
    description: 'Các loại máy tính xách tay',
    products: 25,
    status: 'Hiện',
  },
  {
    key: '2',
    id: 'DM002',
    name: 'Điện thoại',
    description: 'Điện thoại di động',
    products: 30,
    status: 'Hiện',
  },
  {
    key: '3',
    id: 'DM003',
    name: 'Phụ kiện',
    description: 'Phụ kiện điện tử',
    products: 50,
    status: 'Hiện',
  },
  {
    key: '4',
    id: 'DM004',
    name: 'Màn hình',
    description: 'Màn hình máy tính',
    products: 15,
    status: 'Hiện',
  },
  {
    key: '5',
    id: 'DM005',
    name: 'Máy tính bàn',
    description: 'Máy tính để bàn',
    products: 20,
    status: 'Ẩn',
  },
];

const CategoriesManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">Quản lý danh mục</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="!rounded-button cursor-pointer whitespace-nowrap"
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
            style={{ width: 300 }}
            className="!rounded-button"
          />
        </div>
        <Table
          dataSource={categoryData}
          columns={[
            {
              title: 'Mã',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Tên danh mục',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Mô tả',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Số sản phẩm',
              dataIndex: 'products',
              key: 'products',
            },
            {
              title: 'Trạng thái',
              dataIndex: 'status',
              key: 'status',
              render: (status) => (
                <Text>
                  <span style={{ color: status === 'Hiện' ? '#10B981' : '#000' }}>
                    {status}
                  </span>
                </Text>
              ),
            },
            {
              title: 'Thao tác',
              key: 'action',
              render: () => (
                <Space size="middle">
                  <Button type="text" icon={<EditOutlined />} className="!rounded-button cursor-pointer whitespace-nowrap" />
                  <Button type="text" icon={<DeleteOutlined />} danger className="!rounded-button cursor-pointer whitespace-nowrap" />
                </Space>
              ),
            },
          ]}
          pagination={{ pageSize: 10 }}
          className="overflow-x-auto"
        />
      </Card>
    </div>
  );
};

export default CategoriesManagement;