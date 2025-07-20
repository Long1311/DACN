package com.tmdt.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sanpham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tensp;

    private Integer discount;

    private String ghichu;

    private Double rating;

    @Column(name = "review_count")
    private Integer reviewCount;

    @Embedded
    private Specs specs;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "loai", referencedColumnName = "id")
    private DanhMuc loai;

    public SanPham() {
    }

    public SanPham(String tensp, String ghichu, DanhMuc loai) {
        this.tensp = tensp;
        this.ghichu = ghichu;
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

    public String getGhichu() {
        return ghichu;
    }

    public void setGhichu(String ghichu) {
        this.ghichu = ghichu;
    }

    public DanhMuc getLoai() {
        return loai;
    }

    public void setLoai(DanhMuc loai) {
        this.loai = loai;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Specs getSpecs() {
        return specs;
    }

    public void setSpecs(Specs specs) {
        this.specs = specs;
    }
}
