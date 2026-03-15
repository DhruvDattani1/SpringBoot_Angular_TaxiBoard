package com.taxiboard.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;


import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class TripResponseDTO {

    private Long tripId;

    private LocalDateTime pickupDatetime;
    private LocalDateTime dropoffDatetime;

    private Integer passengerCount;

    private String pickupZone;
    private String dropoffZone;

    private String vendor;
    private String paymentType;

    private BigDecimal tripDistance;
    private BigDecimal fareAmount;
}