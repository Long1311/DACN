package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.api.response.SanPhamResponse;
import com.tmdt.ecommerce.mapper.SanPhamMapper;
import com.tmdt.ecommerce.model.SanPhamVariant;
import com.tmdt.ecommerce.model.User;
import com.tmdt.ecommerce.service.CartService;
import com.tmdt.ecommerce.service.SanPhamService;
import com.tmdt.ecommerce.service.SanPhamVariantService;
import com.tmdt.ecommerce.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private SanPhamService sanPhamService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    @Autowired
    private SanPhamVariantService sanPhamVariantService;

    @Autowired
    private SanPhamMapper sanPhamMapper;

    // ✅ Trang chủ: Tìm kiếm hoặc lấy toàn bộ sản phẩm
    @GetMapping({"/", "/home"})
    public String homePage(@RequestParam(required = false) String keyword, Model model) {
        logger.info("Gọi homePage với keyword: {}", keyword);
        List<SanPhamResponse> sanPhamResponses;

        if (keyword != null && !keyword.isEmpty()) {
            Page<SanPhamVariant> variants = sanPhamVariantService.searchByKeywordPaged(keyword, 0, 10);
            sanPhamResponses = variants.getContent().stream()
                    .map(variant -> sanPhamMapper.convertSanPhamToSanPhamResponse(variant.getSanPham()))
                    .collect(Collectors.toList());
        } else {
            Page<SanPhamResponse> responses = sanPhamService.getAllSanPham(0, 10);
            sanPhamResponses = responses.getContent();
        }

        model.addAttribute("sanphams", sanPhamResponses);
        return "home";
    }

    // ✅ Chi tiết sản phẩm
    @GetMapping("/sanpham/{id}")
    public String sanPhamDetail(@PathVariable Long id, Model model) {
        logger.info("Gọi sanPhamDetail với ID: {}", id);
        try {
            SanPhamResponse sanPhamResponse = sanPhamService.getSanPhamById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Sản phẩm không tồn tại: " + id));

            List<SanPhamResponse> relatedSanphams = sanPhamService.getAllSanPham(0, 10).getContent().stream()
                    .filter(sp -> sp.getLoaiId() != null && !sp.getId().equals(sanPhamResponse.getId())
                            && !sp.getLoaiId().equals(sanPhamResponse.getLoaiId()))
                    .limit(4)
                    .toList();

            model.addAttribute("sanpham", sanPhamResponse);
            model.addAttribute("relatedSanphams", relatedSanphams);
            return "sanpham";

        } catch (IllegalArgumentException e) {
            logger.warn("Sản phẩm không tồn tại với ID: {}", id);
            throw e;
        } catch (Exception e) {
            logger.error("Lỗi khi lấy chi tiết sản phẩm: {}", e.getMessage(), e);
            throw e;
        }
    }

    // ✅ Thêm sản phẩm (biến thể) vào giỏ
    @PostMapping("/variant/{variantId}/add-to-cart")
    public String addVariantToCart(@PathVariable Long variantId,
                                   @RequestParam("soLuongThem") int soLuongThem,
                                   RedirectAttributes redirectAttributes) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (userDetails == null) {
                throw new IllegalStateException("Bạn hãy đăng nhập!!!");
            }

            User user = userService.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            SanPhamVariant variant = sanPhamVariantService.findById(variantId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy biến thể sản phẩm"));

            cartService.addVariantToCart(user, variant, soLuongThem);

            redirectAttributes.addFlashAttribute("success", "Đã thêm vào giỏ hàng");
            return "redirect:/sanpham/" + variant.getSanPham().getId();

        } catch (Exception e) {
            logger.error("Lỗi khi thêm vào giỏ hàng: {}", e.getMessage(), e);
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/";
        }
    }

    // ✅ Xem giỏ hàng
    @GetMapping("/cart")
    public String viewCart(Model model) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (userDetails == null) {
                throw new IllegalStateException("Bạn hãy đăng nhập");
            }

            User user = userService.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            model.addAttribute("carts", cartService.getCartByUser(user));
            return "cart";

        } catch (Exception e) {
            logger.error("Lỗi khi lấy giỏ hàng: {}", e.getMessage(), e);
            model.addAttribute("error", e.getMessage());
            return "cart";
        }
    }
}
