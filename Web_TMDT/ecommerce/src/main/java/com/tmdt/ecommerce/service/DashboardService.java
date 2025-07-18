package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.api.response.DashboardResponse;
import com.tmdt.ecommerce.model.Orders;
import com.tmdt.ecommerce.repository.OrdersRepository;
import com.tmdt.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    public DashboardResponse getDashboardData() {
        LocalDate now = LocalDate.now();
        LocalDate sevenDaysAgo = now.minusDays(7);
        Date startDate = Date.from(sevenDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(now.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        long totalUsers = userRepository.count();

        long newOrders = ordersRepository.countByNgaydatBetween(startDate, endDate);

        double totalRevenue = ordersRepository.findByNgaydatBetween(startDate, endDate).stream()
                .filter(order -> "PENDING".equalsIgnoreCase(order.getTrangthai()))
                .mapToDouble(Orders::getThanhtien)
                .sum();

        double conversionRate = totalUsers == 0 ? 0.0 : (double) newOrders / totalUsers * 100;

        return new DashboardResponse(totalUsers, newOrders, totalRevenue, conversionRate);
    }
}

