package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.api.response.OrderItemsResponse;
import com.tmdt.ecommerce.api.response.OrderResponse;
import com.tmdt.ecommerce.config.VnPayCofig;
import com.tmdt.ecommerce.model.*;
import com.tmdt.ecommerce.repository.CartItemsRepository;
import com.tmdt.ecommerce.repository.OrdersRepository;
import com.tmdt.ecommerce.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private static final Logger logger = Logger.getLogger(OrderService.class.getName());

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private VnPayCofig vnPayCofig;

    @Transactional
    public Orders createOrderEntity(String username, String paymentMethod) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng: " + username));
        Carts cart = cartService.getCartByUser(user);

        Orders order = new Orders();
        order.setUser(user);
        order.setThanhtien(calculateTotal(cart));
        order.setTrangthai("PENDING");
        order.setNgaydat(new Date());

        List<OrderItems> orderItems = cart.getCartItems().stream()
                .filter(item -> Boolean.TRUE.equals(item.getSelected()))
                .map(item -> {
                    OrderItems orderItem = new OrderItems();
                    orderItem.setSoluong(item.getSoluong());
                    orderItem.setGia(item.getVariant().getGia());
                    orderItem.setOrder(order);
                    orderItem.setSanphamVariant(item.getVariant());

                    SanPhamVariant variant = item.getVariant();
                    if (variant != null) {
                        orderItem.setTensp(variant.getSanPham().getTensp());
                        orderItem.setColor(variant.getColor());
                        orderItem.setStorage(variant.getStorage());
                    }

                    return orderItem;
                })
                .collect(Collectors.toList());

        order.setOrderItems(orderItems);
        return ordersRepository.save(order);
    }

    @Transactional
    public Orders createOrderFromProductEntity(String username, Long variantId, int soluong, String paymentMethod, HttpServletRequest request) {
        logger.info("Creating order (entity) for username=" + username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng: " + username));
        SanPhamVariant variant = cartService.getVariantById(variantId);
        if (variant == null) throw new IllegalArgumentException("Không tìm thấy biến thể sản phẩm với ID: " + variantId);
        if (variant.getSoluong() < soluong) throw new IllegalArgumentException("Sản phẩm đã hết hàng hoặc số lượng không đủ");

        Orders order = new Orders();
        order.setUser(user);
        order.setThanhtien(variant.getGia().doubleValue() * soluong);
        order.setTrangthai("PENDING");
        order.setNgaydat(new Date());

        OrderItems orderItem = new OrderItems();
        orderItem.setOrder(order);
        orderItem.setSanphamVariant(variant);
        orderItem.setSoluong(soluong);
        orderItem.setGia(variant.getGia());
        orderItem.setTensp(variant.getSanPham().getTensp());
        orderItem.setColor(variant.getColor());
        orderItem.setStorage(variant.getStorage());

        order.setOrderItems(List.of(orderItem));
        Orders savedOrder = ordersRepository.save(order);

        logger.info("Order saved with ID: " + savedOrder.getId());
        return savedOrder;
    }

    @Transactional
    public OrderResponse createOrder(String username, String paymentMethod) {
        Orders savedOrder = createOrderEntity(username, paymentMethod);
        return convertToOrderResponse(savedOrder);
    }

    public List<OrderResponse> getOrdersByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng: " + username));
        List<Orders> orders = ordersRepository.findByUser(user);
        return orders.stream().map(this::convertToOrderResponse).collect(Collectors.toList());
    }

    public OrderResponse getOrderById(Long id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đơn hàng với ID: " + id));
        return convertToOrderResponse(order);
    }

    public List<OrderResponse> getAllOrders() {
        List<Orders> orders = ordersRepository.findAll();
        return orders.stream().map(this::convertToOrderResponse).collect(Collectors.toList());
    }

    private Double calculateTotal(Carts cart) {
        return cart.getCartItems().stream()
                .mapToDouble(item -> item.getSoluong() * item.getVariant().getGia().doubleValue())
                .sum();
    }

    public List<Double> getMonthlyRevenue() {
        List<Double> revenueByMonth = new ArrayList<>(Collections.nCopies(12, 0.0));
        List<Orders> allOrders = ordersRepository.findAll();
        for (Orders order : allOrders) {
            if (order.getNgaydat() != null) {
                Calendar cal = Calendar.getInstance();
                cal.setTime(order.getNgaydat());
                int month = cal.get(Calendar.MONTH);
                revenueByMonth.set(month, revenueByMonth.get(month) + order.getThanhtien());
            }
        }
        return revenueByMonth;
    }


    public Map<String, Long> getOrderStatusCounts() {
        // Lấy thời gian hiện tại
        Calendar now = Calendar.getInstance();
        int currentMonth = now.get(Calendar.MONTH);
        int currentYear = now.get(Calendar.YEAR);

        // Lọc đơn hàng theo tháng và năm hiện tại
        List<Orders> currentMonthOrders = ordersRepository.findAll().stream()
                .filter(order -> {
                    Calendar orderCal = Calendar.getInstance();
                    orderCal.setTime(order.getNgaydat());
                    return orderCal.get(Calendar.MONTH) == currentMonth &&
                            orderCal.get(Calendar.YEAR) == currentYear;
                })
                .collect(Collectors.toList());

        Map<String, Long> rawStatusMap = currentMonthOrders.stream()
                .collect(Collectors.groupingBy(Orders::getTrangthai, Collectors.counting()));

        Map<String, Long> mappedStatus = new HashMap<>();
        mappedStatus.put("Đã giao", rawStatusMap.getOrDefault("COMPLETED", 0L));
        mappedStatus.put("Đang giao", rawStatusMap.getOrDefault("SHIPPING", 0L));
        mappedStatus.put("Chờ xác nhận", rawStatusMap.getOrDefault("PENDING", 0L));
        mappedStatus.put("Đã hủy", rawStatusMap.getOrDefault("CANCELLED", 0L));

        return mappedStatus;
    }


    public List<Integer> countOrdersByMonth() {
        List<Orders> allOrders = ordersRepository.findAll();
        List<Integer> counts = new ArrayList<>(Collections.nCopies(12, 0));
        for (Orders order : allOrders) {
            if (order.getNgaydat() != null) {
                Calendar cal = Calendar.getInstance();
                cal.setTime(order.getNgaydat());
                int month = cal.get(Calendar.MONTH);
                counts.set(month, counts.get(month) + 1);
            }
        }
        return counts;
    }

    @Transactional
    public void updateOrderStatus(Long orderId, String newStatus) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đơn hàng với ID: " + orderId));

        if (!List.of("PENDING", "SHIPPING", "COMPLETED", "CANCELLED").contains(newStatus)) {
            throw new IllegalArgumentException("Trạng thái không hợp lệ: " + newStatus);
        }

        order.setTrangthai(newStatus);
        ordersRepository.save(order);
    }


    private OrderResponse convertToOrderResponse(Orders order) {
        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
                order.getThanhtien(),
                order.getTrangthai(),
                order.getNgaydat(),
                order.getOrderItems() != null ? order.getOrderItems().stream().map(item -> {
                    SanPhamVariant variant = item.getSanphamVariant();
                    return new OrderItemsResponse(
                            item.getId(),
                            order.getId(),
                            variant != null ? variant.getId() : null,
                            item.getSoluong(),
                            item.getGia(),
                            item.getTensp(),
                            item.getColor(),
                            item.getStorage()
                    );
                }).collect(Collectors.toList()) : List.of()
        );
    }
}
