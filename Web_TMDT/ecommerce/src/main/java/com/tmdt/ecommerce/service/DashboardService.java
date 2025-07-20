package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.api.response.DashboardResponse;
import com.tmdt.ecommerce.api.response.LowStockProductResponse;
import com.tmdt.ecommerce.api.response.TopSellingProductResponse;
import com.tmdt.ecommerce.model.Orders;
import com.tmdt.ecommerce.repository.OrdersRepository;
import com.tmdt.ecommerce.repository.SanPhamVariantRepository;
import com.tmdt.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private SanPhamVariantRepository sanPhamVariantRepository;


    public DashboardResponse getDashboardData() {
        LocalDate now = LocalDate.now();

        // Lấy ngày đầu và cuối của tháng hiện tại
        LocalDate startOfMonth = now.withDayOfMonth(1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        Date startDate = Date.from(startOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(startOfNextMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());

        long totalUsers = userRepository.count();

        long newOrders = ordersRepository.countByNgaydatBetween(startDate, endDate);

        long deliveredOrders = ordersRepository.countByTrangthaiAndNgaydatBetween("COMPLETED", startDate, endDate);

        long cancelledOrders = ordersRepository.countByTrangthaiAndNgaydatBetween("CANCELLED", startDate, endDate);


        double totalRevenue = ordersRepository.findByNgaydatBetween(startDate, endDate).stream()
                .mapToDouble(Orders::getThanhtien)
                .sum();

        double conversionRate = totalUsers == 0 ? 0.0 : (double) newOrders / totalUsers * 100;

        return new DashboardResponse(totalUsers, newOrders, totalRevenue, conversionRate, deliveredOrders, cancelledOrders);
    }


    public List<TopSellingProductResponse> getTopSellingProducts() {
        LocalDate now = LocalDate.now();
        Date startOfMonth = Date.from(now.withDayOfMonth(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endOfMonth = Date.from(now.plusMonths(1).withDayOfMonth(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Pageable pageable = PageRequest.of(0, 5);
        return sanPhamVariantRepository.findTopSellingProducts(startOfMonth, endOfMonth, pageable);
    }

    public Page<LowStockProductResponse> getLowStockProducts(Pageable pageable) {
        return sanPhamVariantRepository.findLowStockProducts(pageable);
    }

}

