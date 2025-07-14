package com.tmdt.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ánh xạ URL /images/products/** tới thư mục thực tế
        registry.addResourceHandler("/images/products/**")
                .addResourceLocations("file:D:/DACN/Web_TMDT/uploads/products/");

        // Ánh xạ ảnh avatar người dùng
        registry.addResourceHandler("/profiles/**")
                .addResourceLocations("file:D:/DACN/Web_TMDT/uploads/profiles/");
    }
}
