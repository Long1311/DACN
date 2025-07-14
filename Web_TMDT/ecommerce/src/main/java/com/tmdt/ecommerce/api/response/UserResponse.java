package com.tmdt.ecommerce.api.response;

public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String quyentruycap;
    private String name;
    private String phone;
    private String address;
    private String gender;
    private String avatarUrl;

    public UserResponse() {
    }

    public UserResponse(Long id, String username, String email, String quyentruycap, String name, String phone, String address, String gender, String avatarUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.quyentruycap = quyentruycap;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.gender = gender;
        this.avatarUrl = avatarUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getQuyentruycap() {
        return quyentruycap;
    }

    public void setQuyentruycap(String quyentruycap) {
        this.quyentruycap = quyentruycap;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
