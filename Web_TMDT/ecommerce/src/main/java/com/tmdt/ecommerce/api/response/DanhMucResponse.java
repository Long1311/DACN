package com.tmdt.ecommerce.api.response;

public class DanhMucResponse {
    private Long id;
    private String tendm;

    public DanhMucResponse() {
    }

    public DanhMucResponse(Long id, String tendm) {
        this.id = id;
        this.tendm = tendm;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTendm() {
        return tendm;
    }

    public void setTendm(String tendm) {
        this.tendm = tendm;
    }
}
