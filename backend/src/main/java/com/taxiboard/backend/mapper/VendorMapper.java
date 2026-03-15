package com.taxiboard.backend.mapper;

import com.taxiboard.backend.dto.VendorDTO;
import com.taxiboard.backend.entity.Vendor;

public class VendorMapper {
    public static VendorDTO toDTO(Vendor vendor) {
        return VendorDTO.builder()
                .vendorId(vendor.getVendorId())
                .vendorName(vendor.getVendorName())
                .build();
    }
}