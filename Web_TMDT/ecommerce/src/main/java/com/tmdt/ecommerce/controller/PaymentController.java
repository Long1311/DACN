package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.config.VnPayCofig;
import com.tmdt.ecommerce.model.User;
import com.tmdt.ecommerce.repository.UserRepository;
import com.tmdt.ecommerce.service.CartService;
import com.tmdt.ecommerce.service.OrderService;
import com.tmdt.ecommerce.service.UserService;
import com.tmdt.ecommerce.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private VnPayCofig vnPayCofig;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> payload, HttpServletRequest request) {
        try {
            String token = extractTokenFromRequest(request);
            if (token == null) {
                return ResponseEntity.status(401).body(Map.of("status", "unauthorized"));
            }

            String username = jwtUtil.extractUsername(token);
            String mode = (String) payload.get("mode");
            long amount = ((Number) payload.get("amount")).longValue();

            User user = userService.findByUsername(username).orElseThrow();
            Long orderId;

            // ➤ Tạo đơn hàng PENDING trước
            if ("detail".equals(mode)) {
                Long variantId = ((Number) payload.get("variantId")).longValue();
                int soluong = ((Number) payload.get("soluong")).intValue();
                orderId = orderService.createPendingOrderFromProduct(username, variantId, soluong);
            } else {
                orderId = orderService.createPendingOrderFromCart(username);
            }

            // ➤ Chuẩn bị redirect đến VNPay
            String orderInfo = mode;
            if ("detail".equals(mode)) {
                orderInfo += "|variantId=" + payload.get("variantId") + "|soluong=" + payload.get("soluong");
            }

            String ipAddr = request.getRemoteAddr();
            String txnRef = user.getId() + "_" + orderId;

            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", "2.1.0");
            vnp_Params.put("vnp_Command", "pay");
            vnp_Params.put("vnp_TmnCode", vnPayCofig.vnp_TmnCode);
            vnp_Params.put("vnp_Amount", String.valueOf(amount * 100));
            vnp_Params.put("vnp_CurrCode", "VND");
            vnp_Params.put("vnp_TxnRef", txnRef);
            vnp_Params.put("vnp_OrderInfo", orderInfo);
            vnp_Params.put("vnp_OrderType", "other");
            vnp_Params.put("vnp_ReturnUrl", vnPayCofig.vnp_ReturnUrl);
            vnp_Params.put("vnp_IpAddr", ipAddr);
            vnp_Params.put("vnp_Locale", "vn");
            vnp_Params.put("vnp_CreateDate", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));

            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);

            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();

            for (String field : fieldNames) {
                String value = URLEncoder.encode(vnp_Params.get(field), StandardCharsets.US_ASCII.toString());
                hashData.append(field).append('=').append(value).append('&');
                query.append(field).append('=').append(value).append('&');
            }

            hashData.setLength(hashData.length() - 1);
            query.setLength(query.length() - 1);

            String secureHash = hmacSHA512(vnPayCofig.vnp_HashSecret, hashData.toString());
            String paymentUrl = vnPayCofig.vnp_Url + "?" + query + "&vnp_SecureHash=" + secureHash;

            return ResponseEntity.ok(Map.of("url", paymentUrl));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi tạo URL thanh toán"));
        }
    }

    @GetMapping("/vnpay-return")
    public ResponseEntity<?> handleVnpayReturn(HttpServletRequest request) {
        String responseCode = request.getParameter("vnp_ResponseCode");

        try {
            if (!"00".equals(responseCode)) {
                return ResponseEntity.ok(Map.of("status", "fail"));
            }

            String txnRef = request.getParameter("vnp_TxnRef");
            String[] parts = txnRef.split("_");
            Long userId = Long.parseLong(parts[0]);
            Long orderId = Long.parseLong(parts[1]);

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng ID = " + userId));
            String username = user.getUsername();

            String orderInfo = request.getParameter("vnp_OrderInfo");
            System.out.println("🧾 VNPay orderInfo: " + orderInfo);

            if (orderInfo != null && orderInfo.startsWith("cart")) {
                cartService.clearCart(userId);
                System.out.println(">>> HANDLE VNPAY RETURN: userId = " + userId);
            }

            return ResponseEntity.ok(Map.of("status", "success"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("status", "error"));
        }
    }

    private String hmacSHA512(String key, String data) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac.init(secretKey);
            byte[] hashBytes = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hashBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error generating HMAC SHA512", e);
        }
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        return (bearer != null && bearer.startsWith("Bearer ")) ? bearer.substring(7) : null;
    }

    private String extractValue(String input, String key) {
        for (String part : input.split("\\|")) {
            if (part.startsWith(key + "=")) {
                return part.substring((key + "=").length());
            }
        }
        return null;
    }
}
