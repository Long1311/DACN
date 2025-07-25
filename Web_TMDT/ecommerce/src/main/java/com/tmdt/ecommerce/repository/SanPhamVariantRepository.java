package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.api.response.LowStockProductResponse;
import com.tmdt.ecommerce.api.response.TopSellingProductResponse;
import com.tmdt.ecommerce.model.SanPhamVariant;
import com.tmdt.ecommerce.model.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface SanPhamVariantRepository extends JpaRepository<SanPhamVariant, Long> {
    List<SanPhamVariant> findBySanPhamId(Long sanPhamId);

    List<SanPhamVariant> findBySanPham_Loai_Id(Long loaiId);

    @Query("SELECT v FROM SanPhamVariant v WHERE " +
            "(LOWER(v.sanPham.tensp) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(v.color) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(v.storage) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND v.disabled = false")
    Page<SanPhamVariant> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    List<SanPhamVariant> findByColorIgnoreCase(String color);

    List<SanPhamVariant> findByStorageIgnoreCase(String storage);

    List<SanPhamVariant> findByColorIgnoreCaseAndStorageIgnoreCase(String color, String storage);

    List<SanPhamVariant> findTop4BySanPham_Loai_IdAndIdNot(Long loaiId, Long excludeId);

    boolean existsBySanPhamAndColorIgnoreCaseAndStorageIgnoreCase(SanPham sanPham, String color, String storage);

    @Query("SELECT v FROM SanPhamVariant v ORDER BY v.createdAt DESC")
    List<SanPhamVariant> findTopNewestVariants(Pageable pageable);

    @Query("SELECT v FROM SanPhamVariant v WHERE v.discount > 0 AND v.disabled = false ORDER BY v.createdAt DESC")
    List<SanPhamVariant> findTopDiscountedVariants();

    @Query("SELECT new com.tmdt.ecommerce.api.response.LowStockProductResponse( " +
            "v.id, v.sanPham.tensp, v.soluong, 20, v.color, v.storage, v.imageUrl) " +
            "FROM SanPhamVariant v WHERE v.soluong <= 20")
    Page<LowStockProductResponse> findLowStockProducts(Pageable pageable);

    @Query("SELECT new com.tmdt.ecommerce.api.response.TopSellingProductResponse( " +
            "v.id, v.sanPham.tensp, v.color, v.storage, SUM(oi.soluong), SUM(oi.soluong * oi.gia), v.imageUrl) " +
            "FROM OrderItems oi " +
            "JOIN oi.order o " +
            "JOIN oi.sanphamVariant v " +
            "WHERE o.ngaydat BETWEEN :startDate AND :endDate " +
            "GROUP BY v.id, v.sanPham.tensp, v.color, v.storage, v.imageUrl " +
            "ORDER BY SUM(oi.soluong) DESC")
    List<TopSellingProductResponse> findTopSellingProducts(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);
}