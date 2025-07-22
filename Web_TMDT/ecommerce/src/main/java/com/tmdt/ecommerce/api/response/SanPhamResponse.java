package com.tmdt.ecommerce.api.response;

public class SanPhamResponse {
    private Long id;
    private String tensp;
    private SpecsResponse specs;
    private Long loaiId;

    public SanPhamResponse() {
    }

    public SanPhamResponse(Long id, String tensp, SpecsResponse specs, Long loaiId) {
        this.id = id;
        this.tensp = tensp;
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

    public Long getLoaiId() {
        return loaiId;
    }

    public void setLoaiId(Long loaiId) {
        this.loaiId = loaiId;
    }

    public SpecsResponse getSpecs() {
        return specs;
    }

    public void setSpecs(SpecsResponse specs) {
        this.specs = specs;
    }
}
