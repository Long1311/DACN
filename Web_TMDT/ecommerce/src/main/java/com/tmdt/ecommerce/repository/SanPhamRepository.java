package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.model.DanhMuc;
import com.tmdt.ecommerce.model.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    Page<SanPham> findByLoai(DanhMuc loai, Pageable pageable);
}
