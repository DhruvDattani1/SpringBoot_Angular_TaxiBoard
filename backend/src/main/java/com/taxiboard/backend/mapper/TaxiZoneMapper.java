package com.taxiboard.backend.mapper;

import com.taxiboard.backend.dto.TaxiZoneDTO;
import com.taxiboard.backend.entity.TaxiZone;

public class TaxiZoneMapper {
    public static TaxiZoneDTO toDTO(TaxiZone zone) {
        return TaxiZoneDTO.builder()
                .locationId(zone.getLocationId())
                .borough(zone.getBorough())
                .zone(zone.getZone())
                .serviceZone(zone.getServiceZone())
                .build();
    }
}