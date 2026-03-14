package com.taxiboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AnalyticsDTO {

    private Long totalTrips;

    private BigDecimal averageFare;
    private BigDecimal averageDistance;
    private BigDecimal totalRevenue;

    private String mostPopularPickupZone;
    private String mostUsedPaymentType;
}