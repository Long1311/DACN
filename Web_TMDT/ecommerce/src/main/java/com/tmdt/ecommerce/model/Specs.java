package com.tmdt.ecommerce.model;

import jakarta.persistence.Embeddable;


@Embeddable
public class Specs {
    private String screen;
    private String cpu;
    private String ram;
    private String camera;
    private String frontCamera;
    private String battery;
    private String os;

    public Specs() {
    }

    public Specs(String screen, String cpu, String ram, String camera, String frontCamera, String battery, String os) {
        this.screen = screen;
        this.cpu = cpu;
        this.ram = ram;
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
