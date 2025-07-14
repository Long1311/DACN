package com.tmdt.ecommerce.mapper;

import com.tmdt.ecommerce.api.response.SanPhamResponse;
import com.tmdt.ecommerce.api.response.SpecsResponse;
import com.tmdt.ecommerce.model.*;
import org.springframework.stereotype.Component;

@Component
public class SanPhamMapper {

    public SanPham convertSanPhamResponseToSanPham(SanPhamResponse response) {
        SanPham sanPham = new SanPham();
        if (response != null) {
            sanPham.setId(response.getId());
            sanPham.setTensp(response.getTensp());
            sanPham.setGia(response.getGia());
            sanPham.setOriginalPrice(response.getOriginalPrice());
            sanPham.setDiscount(response.getDiscount());
            sanPham.setGhichu(response.getGhichu());
            sanPham.setRating(response.getRating());
            sanPham.setReviewCount(response.getReviewCount());

            if (response.getLoaiId() != null) {
                DanhMuc loai = new DanhMuc();
                loai.setId(response.getLoaiId());
                sanPham.setLoai(loai);
            }

            if (response.getSpecs() != null) {
                Specs specs = new Specs();
                specs.setScreen(response.getSpecs().getScreen());
                specs.setCpu(response.getSpecs().getCpu());
                specs.setRam(response.getSpecs().getRam());
                specs.setStorageRange(response.getSpecs().getStorageRange());
                specs.setCamera(response.getSpecs().getCamera());
                specs.setFrontCamera(response.getSpecs().getFrontCamera());
                specs.setBattery(response.getSpecs().getBattery());
                specs.setOs(response.getSpecs().getOs());
                sanPham.setSpecs(specs);
            }
        }
        return sanPham;
    }

    public SanPhamResponse convertSanPhamToSanPhamResponse(SanPham sanPham) {
        if (sanPham == null) return null;

        SpecsResponse specsResponse = sanPham.getSpecs() != null ? new SpecsResponse(
                sanPham.getSpecs().getScreen(),
                sanPham.getSpecs().getCpu(),
                sanPham.getSpecs().getRam(),
                sanPham.getSpecs().getStorageRange(),
                sanPham.getSpecs().getCamera(),
                sanPham.getSpecs().getFrontCamera(),
                sanPham.getSpecs().getBattery(),
                sanPham.getSpecs().getOs()
        ) : new SpecsResponse();

        return new SanPhamResponse(
                sanPham.getId(),
                sanPham.getTensp(),
                sanPham.getGia(),
                sanPham.getOriginalPrice(),
                sanPham.getDiscount(),
                sanPham.getGhichu(),
                sanPham.getRating(),
                sanPham.getReviewCount(),
                specsResponse,
                sanPham.getLoai() != null ? sanPham.getLoai().getId() : null
        );
    }

}
