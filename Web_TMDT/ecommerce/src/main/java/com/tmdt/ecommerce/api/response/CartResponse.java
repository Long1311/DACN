package com.tmdt.ecommerce.api.response;

import java.util.List;

public class CartResponse {
    private Long id;
    private Long userId;
    private List<CartItemsResponse> cartItems;

    public CartResponse() {
    }

    public CartResponse(Long id, Long userId, List<CartItemsResponse> cartItems) {
        this.id = id;
        this.userId = userId;
        this.cartItems = cartItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<CartItemsResponse> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemsResponse> cartItems) {
        this.cartItems = cartItems;
    }
}
