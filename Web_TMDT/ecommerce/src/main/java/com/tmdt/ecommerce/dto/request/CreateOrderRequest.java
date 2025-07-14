package com.tmdt.ecommerce.dto.request;

public class CreateOrderRequest {
    private String paymentMethod;

    public CreateOrderRequest() {
    }

    public CreateOrderRequest(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
