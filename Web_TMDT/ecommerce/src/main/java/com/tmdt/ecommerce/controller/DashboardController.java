package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.api.response.DashboardResponse;
import com.tmdt.ecommerce.api.response.LowStockProductResponse;
import com.tmdt.ecommerce.api.response.TopSellingProductResponse;
import com.tmdt.ecommerce.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboardData() {
        return dashboardService.getDashboardData();
    }

    @GetMapping("/low-stock")
    public Page<LowStockProductResponse> getLowStockProducts(@RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return dashboardService.getLowStockProducts(pageable);
    }

    @GetMapping("/top-selling")
    public List<TopSellingProductResponse> getTopSellingProducts() {
        return dashboardService.getTopSellingProducts();
    }
}
