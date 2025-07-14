package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.api.response.SanPhamVariantResponse;
import com.tmdt.ecommerce.model.SanPhamVariant;
import com.tmdt.ecommerce.service.SanPhamVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/variants")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamVariantController {

    @Autowired
    private SanPhamVariantService variantService;

    @GetMapping("/sanpham/{sanPhamId}")
    public List<SanPhamVariantResponse> getVariantsBySanPham(@PathVariable Long sanPhamId) {
        List<SanPhamVariant> variants = variantService.getVariantsBySanPhamId(sanPhamId);
        return variants.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<SanPhamVariantResponse> searchVariantsByLoaiId(@RequestParam(required = false) Long loaiId) {
        List<SanPhamVariant> variants = (loaiId != null)
                ? variantService.getVariantsByLoaiId(loaiId)
                : variantService.getAllVariants();

        return variants.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @GetMapping("/search/keyword")
    public Page<SanPhamVariantResponse> searchByKeyword(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<SanPhamVariant> variants = variantService.searchByKeywordPaged(keyword, page, size);
        return variants.map(this::mapToResponse);
    }


    @GetMapping("/discount")
    public List<SanPhamVariantResponse> getDiscountedVariants() {
        List<SanPhamVariant> variants = variantService.getDiscountedVariants();
        return variants.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @GetMapping("/featured")
    public List<SanPhamVariantResponse> getFeaturedVariants() {
        List<SanPhamVariant> variants = variantService.getFeaturedVariants();
        return variants.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @GetMapping("/filter")
    public List<SanPhamVariantResponse> filterByAttributes(
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String storage
    ) {
        List<SanPhamVariant> variants;

        if (color != null && storage != null) {
            variants = variantService.findByColorAndStorage(color, storage);
        } else if (color != null) {
            variants = variantService.findByColor(color);
        } else if (storage != null) {
            variants = variantService.findByStorage(storage);
        } else {
            variants = variantService.getAllVariants();
        }

        return variants.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public SanPhamVariantResponse getVariantById(@PathVariable Long id) {
        Optional<SanPhamVariant> variantOpt = variantService.getVariantById(id);
        return variantOpt.map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm biến thể id = " + id));
    }

    @GetMapping("/{id}/related")
    public List<SanPhamVariantResponse> getRelatedVariants(@PathVariable Long id) {
        Optional<SanPhamVariant> current = variantService.getVariantById(id);
        if (current.isEmpty()) {
            throw new RuntimeException("Không tìm thấy biến thể");
        }

        Long loaiId = current.get().getSanPham().getLoai().getId(); // Cần đảm bảo getLoai() hoạt động
        List<SanPhamVariant> related = variantService.getRelatedVariants(loaiId, id);

        return related.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    private SanPhamVariantResponse mapToResponse(SanPhamVariant variant) {
        return new SanPhamVariantResponse(
                variant.getId(),
                variant.getColor(),
                variant.getStorage(),
                variant.getGia(),
                variant.getSoluong(),
                variant.getImageUrl(),
                variant.getSanPham().getId(),
                variant.getSanPham().getTensp(),
                variant.getSanPham().getOriginalPrice()
        );
    }
}