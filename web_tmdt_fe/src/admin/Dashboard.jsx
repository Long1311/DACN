import React from 'react';
import { Row, Col, Card, Button, Table, Typography, DatePicker, Space } from 'antd';
import ReactECharts from 'echarts-for-react';
import {
  TeamOutlined,
  ShoppingOutlined,
  DollarOutlined,
  RiseOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { getBarChartOptions, getPieChartOptions, getLineChartOptions } from './bieudo';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const cardData = [
  {
    title: 'Tổng người dùng',
    value: '8,549',
    percent: '+12.5%',
    isUp: true,
    icon: <TeamOutlined />,
    color: '#4F46E5',
  },
  {
    title: 'Đơn hàng mới',
    value: '1,257',
    percent: '+23.1%',
    isUp: true,
    icon: <ShoppingOutlined />,
    color: '#0EA5E9',
  },
  {
    title: 'Doanh thu',
    value: '458.6M₫',
    percent: '+18.7%',
    isUp: true,
    icon: <DollarOutlined />,
    color: '#10B981',
  },
  {
    title: 'Tỷ lệ chuyển đổi',
    value: '3.24%',
    percent: '-1.5%',
    isUp: false,
    icon: <RiseOutlined />,
    color: '#F59E0B',
  },
];

const orderData = [
  {
    key: '1',
    id: 'DH001',
    customer: 'Nguyễn Văn An',
    date: '15/06/2025',
    total: '1,250,000₫',
    status: 'Đã giao',
    payment: 'Đã thanh toán',
  },
  {
    key: '2',
    id: 'DH002',
    customer: 'Trần Thị Bình',
    date: '14/06/2025',
    total: '850,000₫',
    status: 'Đang giao',
    payment: 'Đã thanh toán',
  },
  {
    key: '3',
    id: 'DH003',
    customer: 'Lê Văn Cường',
    date: '13/06/2025',
    total: '2,100,000₫',
    status: 'Chờ xác nhận',
    payment: 'Chưa thanh toán',
  },
  {
    key: '4',
    id: 'DH004',
    customer: 'Phạm Thị Dung',
    date: '12/06/2025',
    total: '1,750,000₫',
    status: 'Đã giao',
    payment: 'Đã thanh toán',
  },
  {
    key: '5',
    id: 'DH005',
    customer: 'Hoàng Văn Em',
    date: '11/06/2025',
    total: '950,000₫',
    status: 'Đã hủy',
    payment: 'Hoàn tiền',
  },
];

const orderColumns = [
  {
    title: 'Mã đơn',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = '';
      switch (status) {
        case 'Đã giao': color = '#10B981'; break;
        case 'Đang giao': color = '#0EA5E9'; break;
        case 'Chờ xác nhận': color = '#F59E0B'; break;
        case 'Đã hủy': color = '#EF4444'; break;
        default: color = '#000';
      }
      return <span style={{ color }}>{status}</span>;
    },
  },
  {
    title: 'Thanh toán',
    dataIndex: 'payment',
    key: 'payment',
    render: (payment) => {
      let color = '';
      switch (payment) {
        case 'Đã thanh toán': color = '#10B981'; break;
        case 'Chưa thanh toán': color = '#F59E0B'; break;
        case 'Hoàn tiền': color = '#EF4444'; break;
        default: color = '#000';
      }
      return <span style={{ color }}>{payment}</span>;
    },
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
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">Tổng quan</Title>
        <RangePicker className="!rounded-button" />
      </div>
      <Row gutter={[24, 24]}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <Text type="secondary">{card.title}</Text>
                  <Title level={3} className="m-0 mt-2">{card.value}</Title>
                  <Text
                    className={`flex items-center mt-1 ${card.isUp ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {card.percent}
                  </Text>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: `${card.color}20` }}>
                  <span className="text-xl" style={{ color: card.color }}>{card.icon}</span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card title="Doanh thu theo tháng" className="h-full shadow-sm">
            <ReactECharts option={getBarChartOptions()} style={{ height: 350 }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Phân bổ đơn hàng" className="h-full shadow-sm">
            <ReactECharts option={getPieChartOptions()} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Xu hướng" className="shadow-sm">
            <ReactECharts option={getLineChartOptions()} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Đơn hàng gần đây" extra={<Button type="link">Xem tất cả</Button>} className="shadow-sm">
            <Table
              dataSource={orderData.slice(0, 3)}
              columns={orderColumns}
              pagination={false}
              className="overflow-x-auto"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;