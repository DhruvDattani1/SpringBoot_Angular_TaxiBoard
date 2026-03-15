package com.taxiboard.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;


@Getter
@Setter
@Builder
public class TaxiZoneDTO {

    private Integer locationId;

    private String borough;
    private String zone;
    private String serviceZone;
}