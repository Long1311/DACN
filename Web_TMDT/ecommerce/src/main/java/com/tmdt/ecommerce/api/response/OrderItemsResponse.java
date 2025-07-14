package com.tmdt.ecommerce.api.response;

public class OrderItemsResponse {
    private Long id;
    private Long orderId;
    private Long variantId;
    private int soluong;
    private Double gia;
    private String tensp;
    private String color;
    private String storage;


    public OrderItemsResponse() {
    }

    public OrderItemsResponse(Long id, Long orderId, Long variantId, int soluong, Double gia, String tensp, String color, String storage) {
        this.id = id;
        this.orderId = orderId;
        this.variantId = variantId;
        this.soluong = soluong;
        this.gia = gia;
        this.tensp = tensp;
        this.color = color;
        this.storage = storage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public int getSoluong() {
        return soluong;
    }

    public void setSoluong(int soluong) {
        this.soluong = soluong;
    }

    public Double getGia() {
        return gia;
    }

    public void setGia(Double gia) {
        this.gia = gia;
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
}
