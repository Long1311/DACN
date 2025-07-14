package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.model.DanhMuc;
import com.tmdt.ecommerce.service.SanPhamService;
import com.tmdt.ecommerce.api.response.SanPhamResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sanpham")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamController {

    private static final Logger logger = LoggerFactory.getLogger(SanPhamController.class);

    @Autowired
    private SanPhamService sanPhamService;

    // Lấy danh sách đường dẫn ảnh banner
    @GetMapping("/banners")
    public ResponseEntity<List<String>> getBanners() {
        List<String> banners = sanPhamService.getBanners();
        return ResponseEntity.ok(banners);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<DanhMuc>> getCategories() {
        List<DanhMuc> categories = sanPhamService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // ✅ Lấy sản phẩm theo danh mục
    @GetMapping("/category/{loaiId}")
    public ResponseEntity<Page<SanPhamResponse>> getSanPhamByCategory(
            @PathVariable Long loaiId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(sanPhamService.findByCategoryId(loaiId, page, size));
    }

    // ✅ Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<SanPhamResponse> getSanPhamById(@PathVariable Long id) {
        return sanPhamService.getSanPhamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Lấy tất cả sản phẩm phân trang
    @GetMapping
    public ResponseEntity<Page<SanPhamResponse>> getAllSanPham(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(sanPhamService.getAllSanPham(page, size));
    }

    // ✅ Lưu sản phẩm mới (admin)
    @PostMapping
    public ResponseEntity<String> saveSanPham(@RequestBody SanPhamResponse response) {
        sanPhamService.saveSanPhamFromResponse(response);
        return ResponseEntity.ok("Sản phẩm đã được lưu thành công");
    }
}
