package com.tmdt.ecommerce.api.response;

public class TopSellingProductResponse {
    private Long variantId;
    private String tensp;
    private String color;
    private String storage;
    private Long totalSold;
    private Double revenue;
    private String imageUrl;

    public TopSellingProductResponse() {
    }

    public TopSellingProductResponse(Long variantId, String tensp, String color, String storage, Long totalSold, Double revenue, String imageUrl) {
        this.variantId = variantId;
        this.tensp = tensp;
        this.color = color;
        this.storage = storage;
        this.totalSold = totalSold;
        this.revenue = revenue;
        this.imageUrl = imageUrl;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public String getTensp() {
        return tensp;
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

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public Long getTotalSold() {
        return totalSold;
    }

    public void setTotalSold(Long totalSold) {
        this.totalSold = totalSold;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
