package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.api.response.CartItemsResponse;
import com.tmdt.ecommerce.api.response.CartResponse;
import com.tmdt.ecommerce.model.*;
import com.tmdt.ecommerce.repository.CartItemsRepository;
import com.tmdt.ecommerce.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SanPhamVariantService sanPhamVariantService;

    // ✅ Thêm sản phẩm (biến thể) vào giỏ
    @PostMapping("/{variantId}/add")
    public ResponseEntity<String> addToCart(
            @PathVariable Long variantId,
            @RequestParam("soLuongThem") int soLuongThem) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (userDetails == null) {
                return ResponseEntity.badRequest().body("Bạn hãy đăng nhập!!!");
            }

            User user = userService.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            SanPhamVariant variant = sanPhamVariantService.findById(variantId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy biến thể sản phẩm"));

            cartService.addVariantToCart(user, variant, soLuongThem);

            return ResponseEntity.ok("Thêm vào giỏ hàng thành công");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    // ✅ Xem giỏ hàng
    @GetMapping
    public ResponseEntity<CartResponse> viewCart() {
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (!(principal instanceof UserDetails userDetails)) {
                return ResponseEntity.status(401).body(new CartResponse(null, null, null));
            }

            User user = userService.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            Carts cart = cartService.getCartByUser(user);
            if (cart == null || cart.getCartItems().isEmpty()) {
                return ResponseEntity.ok(new CartResponse(cart.getId(), user.getId(), new ArrayList<>()));
            }

            CartResponse response = new CartResponse(
                    cart.getId(),
                    user.getId(),
                    cart.getCartItems().stream().map(item -> {
                        SanPhamVariant variant = item.getVariant();
                        SanPham product = variant.getSanPham();

                        return new CartItemsResponse(
                                item.getId(),
                                cart.getId(),
                                variant.getId(),
                                product.getTensp(),
                                variant.getColor(),
                                variant.getStorage(),
                                item.getSoluong(),
                                variant.getGia(),
                                variant.getTenSanPhamVariant(),
                                variant.getImageUrl(),
                                item.getSelected()
                        );
                    }).collect(Collectors.toList())
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new CartResponse(null, null, null));
        }
    }

    // ✅ Cập nhật số lượng hoặc trạng thái chọn
    @PutMapping("/update")
    public ResponseEntity<String> updateCartItem(
            @RequestParam Long cartItemId,
            @RequestParam(required = false) Integer soluong,
            @RequestParam(required = false) Boolean selected) {
        try {
            CartItems item = cartItemsRepository.findById(cartItemId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm trong giỏ"));

            if (soluong != null && soluong > 0) {
                item.setSoluong(soluong);
            }

            if (selected != null) {
                item.setSelected(selected);
            }

            cartItemsRepository.save(item);
            return ResponseEntity.ok("Cập nhật giỏ hàng thành công");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi cập nhật giỏ hàng: " + e.getMessage());
        }
    }

    // ✅ Xóa sản phẩm khỏi giỏ
    @DeleteMapping("/remove")
    public ResponseEntity<?> removeCartItem(@RequestParam Long cartItemId) {
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (!(principal instanceof UserDetails userDetails)) {
                return ResponseEntity.status(401).body("Bạn chưa đăng nhập");
            }

            cartService.removeCartItem(cartItemId, userDetails.getUsername());
            return ResponseEntity.ok("Xóa sản phẩm khỏi giỏ hàng thành công");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi xóa sản phẩm: " + e.getMessage());
        }
    }

    // ✅ Thanh toán giỏ hàng
    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestParam String paymentMethod) {
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (!(principal instanceof UserDetails userDetails)) {
                return ResponseEntity.status(401).body("Bạn chưa đăng nhập");
            }

            User user = userService.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            Carts cart = cartService.getCartByUser(user);

            List<CartItems> selectedItems = cart.getCartItems().stream()
                    .filter(CartItems::getSelected)
                    .collect(Collectors.toList());

            if (selectedItems.isEmpty()) {
                return ResponseEntity.badRequest().body("Không có sản phẩm nào được chọn để thanh toán");
            }

            // Xoá từng sản phẩm đã chọn
            selectedItems.forEach(cartItemsRepository::delete);

            return ResponseEntity.ok("Thanh toán thành công với phương thức: " + paymentMethod);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi thanh toán: " + e.getMessage());
        }
    }

}
