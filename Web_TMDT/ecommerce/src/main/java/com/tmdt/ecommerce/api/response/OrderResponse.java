package com.tmdt.ecommerce.api.response;

import java.util.Date;
import java.util.List;

public class OrderResponse {
    private Long id;
    private Long userId;
    private Double thanhtien;
    private String trangthai;
    private Date ngaydat;
    private String paymentUrl;
    private List<OrderItemsResponse> orderItems;

    public OrderResponse() {
    }

    public OrderResponse(Long id, Long userId, Double thanhtien, String trangthai, Date ngaydat, List<OrderItemsResponse> orderItems) {
        this.id = id;
        this.userId = userId;
        this.thanhtien = thanhtien;
        this.trangthai = trangthai;
        this.ngaydat = ngaydat;
        this.orderItems = orderItems;
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

    public Double getThanhtien() {
        return thanhtien;
    }

    public void setThanhtien(Double thanhtien) {
        this.thanhtien = thanhtien;
    }

    public String getTrangthai() {
        return trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }

    public Date getNgaydat() {
        return ngaydat;
    }

    public void setNgaydat(Date ngaydat) {
        this.ngaydat = ngaydat;
    }

    public String getPaymentUrl() {
        return paymentUrl;
    }

    public void setPaymentUrl(String paymentUrl) {
        this.paymentUrl = paymentUrl;
    }

    public List<OrderItemsResponse> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemsResponse> orderItems) {
        this.orderItems = orderItems;
    }
}
