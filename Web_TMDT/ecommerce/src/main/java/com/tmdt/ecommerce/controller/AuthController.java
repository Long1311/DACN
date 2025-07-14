package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.api.response.AuthResponse;
import com.tmdt.ecommerce.api.response.UserResponse;
import com.tmdt.ecommerce.dto.request.LoginRequest;
import com.tmdt.ecommerce.dto.request.RegisterRequest;
import com.tmdt.ecommerce.model.User;
import com.tmdt.ecommerce.service.UserService;
import com.tmdt.ecommerce.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Tên người dùng không tồn tại"));

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu không đúng");
            }

            // Lấy quyền truy cập từ DB (ví dụ: "user", "admin")
            String role = user.getQuyentruycap().toUpperCase(); // ví dụ: "USER"

            // Tạo claims chứa roles
            Map<String, Object> claims = new HashMap<>();
            claims.put("roles", List.of(role));

            // 🔐 Tạo JWT thực
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            Map<String, Object> extraClaims = new HashMap<>();
            String token = jwtUtil.generateToken(extraClaims, userDetails);


            UserResponse userResponse = userService.getUserByUsername(user.getUsername());

            return ResponseEntity.ok(new AuthResponse(token, userResponse));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi đăng nhập: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        System.out.println("📥 Dữ liệu nhận được: " + registerRequest.getUsername());

        try {
            if (userService.existsByUsername(registerRequest.getUsername())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên người dùng đã tồn tại");
            }

            if (!registerRequest.getPassword().equals(registerRequest.getRepeatPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu không khớp");
            }

            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(registerRequest.getPassword());
            user.setEmail(registerRequest.getEmail());
            user.setQuyentruycap("USER"); // Chuẩn hóa thành "USER"
            user.setName(registerRequest.getName());
            user.setPhone(registerRequest.getPhone());
            user.setAddress(registerRequest.getAddress());

            UserResponse userResponse = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi đăng ký: " + e.getMessage());
        }
    }


    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        try {
            if (token != null && token.startsWith("Bearer ")) {
                String jwt = token.substring(7);
                String username = jwtUtil.extractUsername(jwt); // ✅ Dùng JwtUtil

                User user = userService.findByUsername(username)
                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

                return ResponseEntity.ok(userService.getUserByUsername(username));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi lấy thông tin user: " + e.getMessage());
        }
    }

}
