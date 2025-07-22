package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.dto.request.ChangePasswordRequest;
import com.tmdt.ecommerce.dto.request.UserRequest;
import com.tmdt.ecommerce.api.response.UserResponse;
import com.tmdt.ecommerce.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest request) {
        UserResponse response = userService.createUser(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        UserResponse response = userService.updateUser(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        if (page != null && size != null) {
            Page<UserResponse> pagedUsers = userService.getAllUsers(page, size);
            return ResponseEntity.ok(pagedUsers);
        } else {
            return ResponseEntity.ok(userService.getAllUsers());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse response = userService.getUser(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Xoá thành công");
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getCurrentUserProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDetails == null) {
            return ResponseEntity.badRequest().body(null);
        }
        UserResponse response = userService.getUserByUsername(userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateCurrentUserProfile(@RequestBody UserRequest request) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDetails == null) {
            return ResponseEntity.badRequest().body(null);
        }

        UserResponse response = userService.updateUserByUsername(userDetails.getUsername(), request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload-avatar")
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = userService.uploadAvatarToCloudinary(file);

            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            userService.updateAvatar(username, imageUrl);

            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi upload ảnh: " + e.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDetails == null) {
            return ResponseEntity.badRequest().body("Không xác thực được người dùng");
        }

        return userService.changePassword(request, userDetails.getUsername());
    }


    @GetMapping("/stats/new-users-by-month")
    public ResponseEntity<List<Integer>> getNewUsersByMonth() {
        return ResponseEntity.ok(userService.countNewUsersByMonth());
    }

    @PutMapping("/lock/{id}")
    public ResponseEntity<?> lockUser(@PathVariable Long id) {
        userService.setUserEnabled(id, false);
        return ResponseEntity.ok("Tài khoản đã bị khóa");
    }

    @PutMapping("/unlock/{id}")
    public ResponseEntity<?> unlockUser(@PathVariable Long id) {
        userService.setUserEnabled(id, true);
        return ResponseEntity.ok("Tài khoản đã được mở khóa");
    }
}
