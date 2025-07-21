package com.tmdt.ecommerce.api.response;

import java.util.Date;

public class SanPhamVariantResponse {
    private Long id;
    private String color;
    private String storage;
    private Double gia;
    private Integer soluong;
    private Integer discount;
    private String imageUrl;
    private Long sanPhamId;
    private String tensp;
    private Double originalPrice;
    private boolean disabled;
    private Date createdAt;

    public SanPhamVariantResponse() {
    }

    public SanPhamVariantResponse(Long id, String color, String storage, Double gia, Integer soluong, Integer discount, String imageUrl, Long sanPhamId, String tensp, Double originalPrice, boolean disabled, Date createdAt) {
        this.id = id;
        this.color = color;
        this.storage = storage;
        this.gia = gia;
        this.soluong = soluong;
        this.discount = discount;
        this.imageUrl = imageUrl;
        this.sanPhamId = sanPhamId;
        this.tensp = tensp;
        this.originalPrice = originalPrice;
        this.disabled = disabled;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public Double getGia() {
        return gia;
    }

    public void setGia(Double gia) {
        this.gia = gia;
    }

    public Integer getSoluong() {
        return soluong;
    }

    public void setSoluong(Integer soluong) {
        this.soluong = soluong;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getSanPhamId() {
        return sanPhamId;
    }

    public void setSanPhamId(Long sanPhamId) {
        this.sanPhamId = sanPhamId;
    }

    public String getTensp() {
        return tensp;
    }

    public void setTensp(String tensp) {
        this.tensp = tensp;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
