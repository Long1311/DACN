package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.model.DanhMuc;
import com.tmdt.ecommerce.model.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    Page<SanPham> findByLoai(DanhMuc loai, Pageable pageable);

    @Query("SELECT s FROM SanPham s WHERE LOWER(REPLACE(s.tensp, ' ', '')) = LOWER(REPLACE(:tensp, ' ', ''))")
    Optional<SanPham> findByNormalizedTensp(@Param("tensp") String tensp);
}
