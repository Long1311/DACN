package com.tmdt.ecommerce.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductUploadController {

    @Value("${upload.product.path}")
    private String uploadDir;

    @PostMapping("/product-image")
    public ResponseEntity<String> uploadProductImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File rỗng");
        }

        try {
            // Tạo tên file ngẫu nhiên để tránh trùng lặp
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // Tạo đường dẫn file lưu trên hệ thống
            Path path = Paths.get(uploadDir + filename);
            Files.createDirectories(path.getParent()); // Đảm bảo thư mục tồn tại
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            // Trả về đường dẫn truy cập ảnh từ client
            String imageUrl = "http://localhost:8080/images/products/" + filename;
            return ResponseEntity.ok(imageUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi upload ảnh: " + e.getMessage());
        }
    }
}
