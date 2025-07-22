package com.tmdt.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sanpham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tensp;
    @Embedded
    private Specs specs;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "loai", referencedColumnName = "id")
    private DanhMuc loai;

    public SanPham() {
    }

    public SanPham(String tensp, DanhMuc loai) {
        this.tensp = tensp;
        this.loai = loai;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTensp() {
        return tensp;
    }

    public void setTensp(String tensp) {
        this.tensp = tensp;
    }

    public DanhMuc getLoai() {
        return loai;
    }

    public void setLoai(DanhMuc loai) {
        this.loai = loai;
    }

    public Specs getSpecs() {
        return specs;
    }

    public void setSpecs(Specs specs) {
        this.specs = specs;
    }
}
