package com.tmdt.ecommerce.controller;

import com.tmdt.ecommerce.api.response.DanhMucResponse;
import com.tmdt.ecommerce.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danhmuc")
@CrossOrigin(origins = "*")
public class DanhMucController {

    @Autowired
    private DanhMucService danhMucService;

    @GetMapping
    public List<DanhMucResponse> getAll(@RequestParam(required = false) String keyword) {
        return danhMucService.getAllDanhMuc(keyword);
    }

    @PostMapping
    public DanhMucResponse create(@RequestParam String tendm) {
        return danhMucService.createDanhMuc(tendm);
    }

    @PutMapping("/{id}")
    public DanhMucResponse update(@PathVariable Long id, @RequestParam String tendm) {
        return danhMucService.updateDanhMuc(id, tendm);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        danhMucService.deleteDanhMuc(id);
    }
}
