package com.tmdt.ecommerce.api.response;

public class SanPhamResponse {
    private Long id;
    private String tensp;
    private String ghichu;
    private Double rating;
    private Integer reviewCount;
    private SpecsResponse specs;
    private Integer discount;
    private Long loaiId;

    public SanPhamResponse() {
    }

    public SanPhamResponse(Long id, String tensp, Integer discount, String ghichu,
                           Double rating, Integer reviewCount, SpecsResponse specs, Long loaiId) {
        this.id = id;
        this.tensp = tensp;
        this.discount = discount;
        this.ghichu = ghichu;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.specs = specs;
        this.loaiId = loaiId;
    }

    // Getter và Setter
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

    public Long getLoaiId() {
        return loaiId;
    }

    public void setLoaiId(Long loaiId) {
        this.loaiId = loaiId;
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

    public SpecsResponse getSpecs() {
        return specs;
    }

    public void setSpecs(SpecsResponse specs) {
        this.specs = specs;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }
}
