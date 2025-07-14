import { TeamOutlined, ShoppingOutlined, DollarOutlined, RiseOutlined } from '@ant-design/icons';

export const getBarChartOptions = () => {
  return {
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Doanh thu',
        type: 'bar',
        barWidth: '60%',
        data: [120, 132, 101, 134, 90, 180, 210, 182, 191, 234, 290, 330],
        itemStyle: {
          color: '#4F46E5',
        },
      },
    ],
  };
};

export const getLineChartOptions = () => {
  return {
    animation: false,
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Người dùng mới',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330, 320],
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#10B981',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(16, 185, 129, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(16, 185, 129, 0.05)',
              },
            ],
          },
        },
      },
      {
        name: 'Đơn hàng',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 320],
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#0EA5E9',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(14, 165, 233, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(14, 165, 233, 0.05)',
              },
            ],
          },
        },
      },
    ],
  };
};

export const getPieChartOptions = () => {
  return {
    animation: false,
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Trạng thái đơn hàng',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Đã giao', itemStyle: { color: '#10B981' } },
          { value: 735, name: 'Đang giao', itemStyle: { color: '#0EA5E9' } },
          { value: 580, name: 'Chờ xác nhận', itemStyle: { color: '#F59E0B' } },
          { value: 484, name: 'Đã hủy', itemStyle: { color: '#EF4444' } },
        ],
      },
    ],
  };
};