package com.tmdt.ecommerce.api.response;

public class DashboardResponse {
    private long totalUsers;
    private long newOrders;
    private double totalRevenue;
    private double conversionRate;
    private long deliveredOrders;
    private long cancelledOrders;


    public DashboardResponse(long totalUsers, long newOrders, double totalRevenue, double conversionRate, long deliveredOrders, long cancelledOrders) {
        this.totalUsers = totalUsers;
        this.newOrders = newOrders;
        this.totalRevenue = totalRevenue;
        this.conversionRate = conversionRate;
        this.deliveredOrders = deliveredOrders;
        this.cancelledOrders = cancelledOrders;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getNewOrders() {
        return newOrders;
    }

    public void setNewOrders(long newOrders) {
        this.newOrders = newOrders;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getConversionRate() {
        return conversionRate;
    }

    public void setConversionRate(double conversionRate) {
        this.conversionRate = conversionRate;
    }

    public long getDeliveredOrders() {
        return deliveredOrders;
    }

    public void setDeliveredOrders(long deliveredOrders) {
        this.deliveredOrders = deliveredOrders;
    }

    public long getCancelledOrders() {
        return cancelledOrders;
    }

    public void setCancelledOrders(long cancelledOrders) {
        this.cancelledOrders = cancelledOrders;
    }
}
