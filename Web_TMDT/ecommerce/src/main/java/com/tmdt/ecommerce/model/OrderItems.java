package com.tmdt.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int soluong;
    private Double gia;

    private String tensp;
    private String color;
    private String storage;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "variant_id", referencedColumnName = "id")
        private SanPhamVariant sanphamVariant;

    public OrderItems() {
    }

    public OrderItems(Long id, int soluong, Double gia, String tensp, String color, String storage, Orders order, SanPhamVariant sanphamVariant) {
        this.id = id;
        this.soluong = soluong;
        this.gia = gia;
        this.tensp = tensp;
        this.color = color;
        this.storage = storage;
        this.order = order;
        this.sanphamVariant = sanphamVariant;
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

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public SanPhamVariant getSanphamVariant() {
        return sanphamVariant;
    }

    public void setSanphamVariant(SanPhamVariant sanphamVariant) {
        this.sanphamVariant = sanphamVariant;
    }
}
