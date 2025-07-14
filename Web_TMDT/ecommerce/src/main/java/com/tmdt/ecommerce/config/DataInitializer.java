package com.tmdt.ecommerce.config;

import com.tmdt.ecommerce.model.*;
import com.tmdt.ecommerce.repository.DanhMucRepository;
import com.tmdt.ecommerce.repository.UserRepository;
import com.tmdt.ecommerce.service.SanPhamService;
import com.tmdt.ecommerce.service.SanPhamVariantService;
import com.tmdt.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private SanPhamService sanPhamService;

    @Autowired
    private SanPhamVariantService sanPhamVariantService;

    @Autowired
    private DanhMucRepository danhMucRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (danhMucRepository.findAll().isEmpty()) {
            // Thêm danh mục
            DanhMuc iphone = new DanhMuc("iPhone");
            DanhMuc samsung = new DanhMuc("Samsung");
            DanhMuc phukien = new DanhMuc("Phụ kiện");

            danhMucRepository.save(iphone);
            danhMucRepository.save(samsung);
            danhMucRepository.save(phukien);

            // Tạo sản phẩm iPhone
            SanPham sp1 = new SanPham("iPhone 15 Pro", 9000000.0, "Mới 100%", iphone);
            sp1.setOriginalPrice(14000000.0);
            sp1.setDiscount(12);
            sp1.setRating(0.0);
            sp1.setReviewCount(0);
            sp1.setSpecs(new Specs("OLED 6.1 inch", "A17 Pro", "6GB", "256GB-512GB", "48MP", "12MP", "4380 mAh", "iOS 17"));
            sanPhamService.saveSanPham(sp1);

            // Thêm các biến thể iPhone
            createVariant(sp1, "Hồng", "256GB", 9000000.0, 50, "ip15pro_hong.jpg");
            createVariant(sp1, "Đen", "512GB", 10500000.0, 30, "ip15pro_den.jpg");

            // Tạo sản phẩm Samsung
            SanPham sp2 = new SanPham("Samsung Galaxy S23", 9500000.0, "Mới 100%", samsung);
            sp2.setOriginalPrice(15000000.0);
            sp2.setDiscount(10);
            sp2.setRating(0.0);
            sp2.setReviewCount(0);
            sp2.setSpecs(new Specs("Dynamic AMOLED 6.1 inch", "Snapdragon 8 Gen 2", "8GB", "128GB-256GB", "50MP", "12MP", "3900 mAh", "Android 13"));
            sanPhamService.saveSanPham(sp2);

            // Thêm các biến thể Samsung
            createVariant(sp2, "Đen", "128GB", 9500000.0, 40, "s23_den.jpg");
            createVariant(sp2, "Trắng", "256GB", 10900000.0, 25, "s23_trang.jpg");
        }

        // Tạo tài khoản admin nếu chưa có
        if (!userRepository.findByUsername("admin").isPresent()) {
            User admin = new User("admin", "admin123", "admin@ecommerce.com",
                    "admin", "Admin", "0364695986", "Hà Tây", "male", "");
            userService.registerUser(admin);
        }
    }

    private void createVariant(SanPham sanPham, String color, String storage, Double gia, int soluong, String imageUrl) {
        SanPhamVariant variant = new SanPhamVariant();
        variant.setSanPham(sanPham);
        variant.setColor(color);
        variant.setStorage(storage);
        variant.setGia(gia);
        variant.setSoluong(soluong);
        variant.setImageUrl(imageUrl);
        sanPhamVariantService.saveVariant(variant);
    }
}
