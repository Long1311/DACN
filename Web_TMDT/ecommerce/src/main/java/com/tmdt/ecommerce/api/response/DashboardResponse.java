package com.tmdt.ecommerce.api.response;

public class DashboardResponse {
    private long totalUsers;
    private long newOrders;
    private double totalRevenue;
    private double conversionRate;

    public DashboardResponse(long totalUsers, long newOrders, double totalRevenue, double conversionRate) {
        this.totalUsers = totalUsers;
        this.newOrders = newOrders;
        this.totalRevenue = totalRevenue;
        this.conversionRate = conversionRate;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getNewOrders() {
        return newOrders;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public double getConversionRate() {
        return conversionRate;
    }
}
