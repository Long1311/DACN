package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.model.SanPhamVariant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SanPhamVariantRepository extends JpaRepository<SanPhamVariant, Long> {
    List<SanPhamVariant> findBySanPhamId(Long sanPhamId);

    List<SanPhamVariant> findBySanPham_Loai_Id(Long loaiId);

    List<SanPhamVariant> findBySanPham_DiscountGreaterThan(int discount);

    List<SanPhamVariant> findTop8ByOrderBySanPham_RatingDesc();

    Page<SanPhamVariant> findBySanPham_TenspContainingIgnoreCase(String keyword, Pageable pageable);

    List<SanPhamVariant> findByColorIgnoreCase(String color);

    List<SanPhamVariant> findByStorageIgnoreCase(String storage);

    List<SanPhamVariant> findByColorIgnoreCaseAndStorageIgnoreCase(String color, String storage);

    List<SanPhamVariant> findTop4BySanPham_Loai_IdAndIdNot(Long loaiId, Long excludeId);


}
