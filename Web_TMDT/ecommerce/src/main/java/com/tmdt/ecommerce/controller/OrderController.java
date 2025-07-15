package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.api.response.OrderResponse;
import com.tmdt.ecommerce.dto.request.CreateOrderRequest;
import com.tmdt.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private static final Logger logger = Logger.getLogger(OrderController.class.getName());

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            logger.warning("Unauthorized attempt to create order: No valid authentication");
            return ResponseEntity.status(401).body(null);
        }
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String username = userDetails.getUsername();
        logger.info("Creating order for username: " + username + ", paymentMethod: " + request.getPaymentMethod());
        OrderResponse response = orderService.createOrder(username, request.getPaymentMethod());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            logger.warning("Unauthorized attempt to get user orders: No valid authentication");
            return ResponseEntity.status(401).body(null);
        }
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String username = userDetails.getUsername();
        logger.info("Fetching orders for username: " + username);
        List<OrderResponse> responses = orderService.getOrdersByUsername(username);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        logger.info("Fetching order with ID: " + id);
        OrderResponse response = orderService.getOrderById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        logger.info("Fetching all orders");
        List<OrderResponse> responses = orderService.getAllOrders();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/stats/revenue-by-month")
    public ResponseEntity<List<Double>> getRevenueByMonth() {
        return ResponseEntity.ok(orderService.getMonthlyRevenue());
    }

    @GetMapping("/stats/status-count")
    public ResponseEntity<?> getOrderStatusCounts() {
        return ResponseEntity.ok(orderService.getOrderStatusCounts());
    }

    @GetMapping("/stats/orders-by-month")
    public ResponseEntity<List<Integer>> countOrdersByMonth() {
        return ResponseEntity.ok(orderService.countOrdersByMonth());
    }

}