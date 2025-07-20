package com.tmdt.ecommerce.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dpxhr0akx");
        config.put("api_key", "193319581847693");
        config.put("api_secret", "PCssb4pOFXV6C0_A8np-vOAoxBc");

        return new Cloudinary(config);
    }
}

