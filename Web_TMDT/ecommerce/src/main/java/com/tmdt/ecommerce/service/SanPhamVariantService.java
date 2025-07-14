package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.model.SanPhamVariant;
import com.tmdt.ecommerce.repository.SanPhamVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamVariantService{
    @Autowired
    private SanPhamVariantRepository variantRepository;

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
        return variantRepository.findAll().stream()
                .filter(v -> {
                    Double gia = v.getGia();
                    Double original = v.getSanPham() != null ? v.getSanPham().getOriginalPrice() : null;
                    return gia != null && original != null && gia < original;
                })
                .toList();
    }


    public List<SanPhamVariant> getFeaturedVariants() {
        return variantRepository.findTop8ByOrderBySanPham_RatingDesc();
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


}
