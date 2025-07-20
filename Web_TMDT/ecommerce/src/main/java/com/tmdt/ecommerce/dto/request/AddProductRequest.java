package com.tmdt.ecommerce.dto.request;

import java.util.List;

public class AddProductRequest {
    private String tensp;
    private Long danhMucId;
    private String color;
    private List<String> storages;
    private String imageUrl;
    private Double gia;
    private int soLuong;
    private Double originalPrice;


    public AddProductRequest() {
    }

    public AddProductRequest(String tensp, Long danhMucId, String color, List<String> storages, String imageUrl, Double gia, int soLuong, Double originalPrice) {
        this.tensp = tensp;
        this.danhMucId = danhMucId;
        this.color = color;
        this.storages = storages;
        this.imageUrl = imageUrl;
        this.gia = gia;
        this.soLuong = soLuong;
        this.originalPrice = originalPrice;
    }

    public String getTensp() {
        return tensp;
    }

    public Long getDanhMucId() {
        return danhMucId;
    }

    public void setDanhMucId(Long danhMucId) {
        this.danhMucId = danhMucId;
    }

    public void setTensp(String tensp) {
        this.tensp = tensp;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getStorages() {
        return storages;
    }

    public void setStorages(List<String> storages) {
        this.storages = storages;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getGia() {
        return gia;
    }

    public void setGia(Double gia) {
        this.gia = gia;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }
}
