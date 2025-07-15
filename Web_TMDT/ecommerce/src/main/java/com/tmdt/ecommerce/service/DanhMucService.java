package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.api.response.DanhMucResponse;
import com.tmdt.ecommerce.model.DanhMuc;
import com.tmdt.ecommerce.repository.DanhMucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhMucService {

    @Autowired
    private DanhMucRepository danhMucRepository;

    private DanhMucResponse convertToResponse(DanhMuc danhMuc) {
        return new DanhMucResponse(danhMuc.getId(), danhMuc.getTendm());
    }

    public List<DanhMucResponse> getAllDanhMuc(String keyword) {
        List<DanhMuc> danhMucs;
        if (keyword != null && !keyword.isEmpty()) {
            danhMucs = danhMucRepository.findAll().stream()
                    .filter(dm -> dm.getTendm().toLowerCase().contains(keyword.toLowerCase()))
                    .collect(Collectors.toList());
        } else {
            danhMucs = danhMucRepository.findAll();
        }

        return danhMucs.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public DanhMucResponse createDanhMuc(String tendm) {
        DanhMuc dm = new DanhMuc(tendm);
        return convertToResponse(danhMucRepository.save(dm));
    }

    public DanhMucResponse updateDanhMuc(Long id, String tendm) {
        DanhMuc dm = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
        dm.setTendm(tendm);
        return convertToResponse(danhMucRepository.save(dm));
    }

    public void deleteDanhMuc(Long id) {
        danhMucRepository.deleteById(id);
    }
}
