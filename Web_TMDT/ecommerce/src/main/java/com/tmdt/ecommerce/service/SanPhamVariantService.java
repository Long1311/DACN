package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.dto.request.AddProductRequest;
import com.tmdt.ecommerce.model.DanhMuc;
import com.tmdt.ecommerce.model.SanPham;
import com.tmdt.ecommerce.model.SanPhamVariant;
import com.tmdt.ecommerce.repository.DanhMucRepository;
import com.tmdt.ecommerce.repository.SanPhamRepository;
import com.tmdt.ecommerce.repository.SanPhamVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SanPhamVariantService{
    @Autowired
    private SanPhamVariantRepository variantRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private DanhMucRepository danhMucRepository;

    public List<SanPhamVariant> getVariantsBySanPhamId(Long sanPhamId) {
        return variantRepository.findBySanPhamId(sanPhamId);
    }

    public Optional<SanPhamVariant> findById(Long id) {
        return variantRepository.findById(id);
    }

    public void saveVariant(SanPhamVariant variant) {
        variantRepository.save(variant);
    }

    public List<SanPhamVariant> getVariantsByLoaiId(Long loaiId) {
        return variantRepository.findBySanPham_Loai_Id(loaiId);
    }

    public List<SanPhamVariant> getAllVariants() {
        return variantRepository.findAll();
    }

    public List<SanPhamVariant> getDiscountedVariants() {
        Pageable top8 = PageRequest.of(0, 8);
        return variantRepository.findTopDiscountedVariants(top8);
    }


    public List<SanPhamVariant> getFeaturedVariants() {
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDateTime.now();

        Pageable top5 = PageRequest.of(0, 5);
        List<SanPhamVariant> bestSellers = variantRepository.findTopSellingProducts(
                        java.sql.Timestamp.valueOf(start),
                        java.sql.Timestamp.valueOf(end),
                        top5
                ).stream()
                .map(response -> variantRepository.findById(response.getVariantId()).orElse(null))
                .filter(v -> v != null)
                .toList();

        List<SanPhamVariant> newest = variantRepository.findTop3ByOrderByCreatedAtDesc();

        List<SanPhamVariant> combined = new ArrayList<>(bestSellers);
        combined.addAll(newest);

        return combined;
    }

    public Optional<SanPhamVariant> getVariantById(Long id) {
        return variantRepository.findById(id);
    }

    public Page<SanPhamVariant> searchByKeywordPaged(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return variantRepository.findBySanPham_TenspContainingIgnoreCase(keyword, pageable);
    }

    public List<SanPhamVariant> findByColor(String color) {
        return variantRepository.findByColorIgnoreCase(color);
    }

    public List<SanPhamVariant> findByStorage(String storage) {
        return variantRepository.findByStorageIgnoreCase(storage);
    }

    public List<SanPhamVariant> findByColorAndStorage(String color, String storage) {
        return variantRepository.findByColorIgnoreCaseAndStorageIgnoreCase(color, storage);
    }

    public List<SanPhamVariant> getRelatedVariants(Long loaiId, Long excludeVariantId) {
        return variantRepository.findTop4BySanPham_Loai_IdAndIdNot(loaiId, excludeVariantId);
    }

    public boolean toggleDisabled(Long id) {
        SanPhamVariant variant = variantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy biến thể sản phẩm với id = " + id));

        variant.setDisabled(!variant.isDisabled());
        variantRepository.save(variant);
        return variant.isDisabled();
    }

    public void addProduct(AddProductRequest request) {
        SanPham sanPham = sanPhamRepository.findByTensp(request.getTensp())
                .orElseGet(() -> {
                    SanPham newSanPham = new SanPham();
                    newSanPham.setTensp(request.getTensp());
                    newSanPham.setRating(0.0);
                    newSanPham.setReviewCount(0);

                    if (request.getDanhMucId() != null) {
                        DanhMuc danhMuc = danhMucRepository.findById(request.getDanhMucId())
                                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + request.getDanhMucId()));
                        newSanPham.setLoai(danhMuc);
                    }

                    return sanPhamRepository.save(newSanPham);
                });

        // Tạo hoặc cập nhật SanPhamVariant
        for (String storage : request.getStorages()) {
            SanPhamVariant variant = new SanPhamVariant();
            variant.setSanPham(sanPham);
            variant.setColor(request.getColor());
            variant.setStorage(storage);

            double giaToLuu;
            if (request.getGia() != null && request.getGia() > 0) {
                giaToLuu = request.getGia();
            } else if (request.getOriginalPrice() != null && request.getOriginalPrice() > 0) {
                giaToLuu = request.getOriginalPrice();
            } else {
                throw new RuntimeException("Không có giá hợp lệ để lưu biến thể sản phẩm.");
            }

            variant.setGia(giaToLuu);
            variant.setOriginalPrice(request.getOriginalPrice() != null ? request.getOriginalPrice() : giaToLuu);
            variant.setSoluong(request.getSoLuong());
            variant.setImageUrl(request.getImageUrl());
            variant.setDisabled(false);

            // Tính discount riêng cho từng biến thể
            Integer discount = 0;
            if (variant.getOriginalPrice() > giaToLuu) {
                double discountPercentage = ((variant.getOriginalPrice() - giaToLuu) / variant.getOriginalPrice()) * 100;
                discount = (int) Math.round(discountPercentage);
            }
            variant.setDiscount(discount);

            variantRepository.save(variant);
        }
    }
}
