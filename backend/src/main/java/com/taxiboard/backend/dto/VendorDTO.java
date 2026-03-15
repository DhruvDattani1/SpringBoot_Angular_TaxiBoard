package com.taxiboard.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;


@Getter
@Setter
@Builder
public class VendorDTO {

    private Integer vendorId;
    private String vendorName;
}