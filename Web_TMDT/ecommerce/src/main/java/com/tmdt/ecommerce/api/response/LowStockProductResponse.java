package com.tmdt.ecommerce.api.response;

public class LowStockProductResponse {
    private Long variantId;
    private String tensp;
    private int soluong;
    private int threshold;
    private String color;
    private String storage;
    private String imageUrl;

    public LowStockProductResponse(Long variantId, String tensp, int soluong, int threshold, String color, String storage, String imageUrl) {
        this.variantId = variantId;
        this.tensp = tensp;
        this.soluong = soluong;
        this.threshold = threshold;
        this.color = color;
        this.storage = storage;
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

    public int getSoluong() {
        return soluong;
    }

    public void setSoluong(int soluong) {
        this.soluong = soluong;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
