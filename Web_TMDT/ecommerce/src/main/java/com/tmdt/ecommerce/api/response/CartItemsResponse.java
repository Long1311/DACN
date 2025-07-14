package com.tmdt.ecommerce.api.response;

public class CartItemsResponse {
    private Long id;
    private Long cartId;
    private Long variantId;
    private int soluong;
    private Double gia;
    private String variantName;
    private String tensp;
    private String color;
    private String storage;
    private String image;
    private Boolean selected;

    public CartItemsResponse() {
    }

    public CartItemsResponse(Long id, Long cartId, Long variantId, String tensp, String color, String storage, int soluong, Double gia, String variantName, String image, Boolean selected) {
        this.id = id;
        this.cartId = cartId;
        this.variantId = variantId;
        this.tensp = tensp;
        this.color = color;
        this.storage = storage;
        this.soluong = soluong;
        this.gia = gia;
        this.variantName = variantName;
        this.image = image;
        this.selected = selected;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
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

    public String getVariantName() {
        return variantName;
    }

    public void setVariantName(String variantName) {
        this.variantName = variantName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }
}
