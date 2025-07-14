package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.api.response.SanPhamResponse;
import com.tmdt.ecommerce.mapper.SanPhamMapper;
import com.tmdt.ecommerce.model.*;
import com.tmdt.ecommerce.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService {
    private static final Logger logger = LoggerFactory.getLogger(SanPhamService.class);

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private SanPhamMapper sanPhamMapper;

    @Autowired
    private DanhMucRepository danhMucRepository;


    public Optional<SanPham> findById(Long id) {
        return sanPhamRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Page<SanPhamResponse> getAllSanPham(int page, int size) {
        logger.info("Gọi getAllSanPham với page: {}, size: {}", page, size);
        Page<SanPham> sanPhamPage = sanPhamRepository.findAll(PageRequest.of(page, size));
        logger.info("Số lượng sản phẩm: {}", sanPhamPage.getContent().size());
        return sanPhamPage.map(sanPhamMapper::convertSanPhamToSanPhamResponse);
    }

    @Transactional
    public void saveSanPham(SanPham sanPham) {
        logger.info("Lưu sản phẩm với ID: {}", sanPham.getId());
        sanPhamRepository.save(sanPham);
    }

    @Transactional(readOnly = true)
    public Optional<SanPhamResponse> getSanPhamById(Long id) {
        return sanPhamRepository.findById(id)
                .map(sanPhamMapper::convertSanPhamToSanPhamResponse);
    }

    @Transactional(readOnly = true)
    public List<String> getBanners() {
        List<String> bannerUrls = new ArrayList<>();
        bannerUrls.add("/images/banner1.jpg");
        bannerUrls.add("/images/banner2.jpg");
        bannerUrls.add("/images/banner3.jpg");
        return bannerUrls;
    }

    @Transactional(readOnly = true)
    public Page<SanPhamResponse> findByCategoryId(Long loaiId, int page, int size) {
        Optional<DanhMuc> loai = danhMucRepository.findById(loaiId);
        if (loai.isPresent()) {
            Page<SanPham> sanPhamPage = sanPhamRepository.findByLoai(loai.get(), PageRequest.of(page, size));
            return sanPhamPage.map(sanPhamMapper::convertSanPhamToSanPhamResponse);
        } else {
            return Page.empty();
        }
    }

    @Transactional
    public void saveSanPhamFromResponse(SanPhamResponse response) {
        SanPham sanPham = sanPhamMapper.convertSanPhamResponseToSanPham(response);
        sanPhamRepository.save(sanPham);
    }

    @Transactional(readOnly = true)
    public List<DanhMuc> getAllCategories() {
        return danhMucRepository.findAll();
    }

}
