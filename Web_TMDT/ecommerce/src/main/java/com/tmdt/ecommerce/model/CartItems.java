package com.tmdt.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int soluong;

    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean selected;

    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id", nullable = false)
    private Carts cart;

    @ManyToOne
    @JoinColumn(name = "variant_id", referencedColumnName = "id", nullable = false)
    private SanPhamVariant variant;

    public CartItems() {
    }

    public CartItems(int soluong, Boolean selected, Carts cart, SanPhamVariant variant) {
        this.soluong = soluong;
        this.selected = selected != null ? selected : true;
        this.cart = cart;
        this.variant = variant;
    }

    public CartItems(Long id, int soluong, Boolean selected, Carts cart, SanPhamVariant variant) {
        this.id = id;
        this.soluong = soluong;
        this.selected = selected;
        this.cart = cart;
        this.variant = variant;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getSoluong() {
        return soluong;
    }

    public void setSoluong(int soluong) {
        this.soluong = soluong;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    public Carts getCart() {
        return cart;
    }

    public void setCart(Carts cart) {
        this.cart = cart;
    }

    public SanPhamVariant getVariant() {
        return variant;
    }

    public void setVariant(SanPhamVariant variant) {
        this.variant = variant;
    }
}
