package com.tmdt.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class VnPayCofig {
    @Value("${vnp_TmnCode}")
    public String vnp_TmnCode;

    @Value("${vnp_HashSecret}")
    public String vnp_HashSecret;

    @Value("${vnp_Url}")
    public String vnp_Url;

    @Value("${vnp_ReturnUrl}")
    public String vnp_ReturnUrl;
}
