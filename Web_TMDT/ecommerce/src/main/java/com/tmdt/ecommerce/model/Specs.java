package com.tmdt.ecommerce.model;

import jakarta.persistence.Embeddable;


@Embeddable
public class Specs {
    private String screen; // Màn hình
    private String cpu; // Chip xử lý
    private String ram; // RAM
    private String storageRange; // Phạm vi bộ nhớ
    private String camera; // Camera sau
    private String frontCamera; // Camera trước
    private String battery; // Pin
    private String os;

    public Specs() {
    }

    public Specs(String screen, String cpu, String ram, String storageRange, String camera, String frontCamera, String battery, String os) {
        this.screen = screen;
        this.cpu = cpu;
        this.ram = ram;
        this.storageRange = storageRange;
        this.camera = camera;
        this.frontCamera = frontCamera;
        this.battery = battery;
        this.os = os;
    }

    public String getScreen() {
        return screen;
    }

    public void setScreen(String screen) {
        this.screen = screen;
    }

    public String getCpu() {
        return cpu;
    }

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public String getStorageRange() {
        return storageRange;
    }

    public void setStorageRange(String storageRange) {
        this.storageRange = storageRange;
    }

    public String getCamera() {
        return camera;
    }

    public void setCamera(String camera) {
        this.camera = camera;
    }

    public String getFrontCamera() {
        return frontCamera;
    }

    public void setFrontCamera(String frontCamera) {
        this.frontCamera = frontCamera;
    }

    public String getBattery() {
        return battery;
    }

    public void setBattery(String battery) {
        this.battery = battery;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }
}
