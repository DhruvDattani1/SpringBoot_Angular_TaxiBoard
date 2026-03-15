package com.taxiboard.backend.service;

import com.taxiboard.backend.dto.AnalyticsDTO;
import com.taxiboard.backend.repository.YellowTripDataRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnalyticsService {

    private final YellowTripDataRepository tripRepository;

    public AnalyticsService(YellowTripDataRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public AnalyticsDTO getAnalytics(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate != null ? startDate.atStartOfDay() : null;
        LocalDateTime end = endDate != null ? endDate.atTime(23, 59, 59) : null;

        List<Object[]> aggregates = tripRepository.getAggregates(start, end);
        Object[] row = aggregates.get(0);

        Long totalTrips = ((Number) row[0]).longValue();
        BigDecimal averageFare = row[1] != null
                ? BigDecimal.valueOf(((Number) row[1]).doubleValue()).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;
        BigDecimal averageDistance = row[2] != null
                ? BigDecimal.valueOf(((Number) row[2]).doubleValue()).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;
        BigDecimal totalRevenue = row[3] != null
                ? BigDecimal.valueOf(((Number) row[3]).doubleValue()).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        String mostPopularPickupZone = tripRepository.getMostPopularPickupZone(start, end)
                .stream().findFirst().orElse("Unknown");
        String mostUsedPaymentType = tripRepository.getMostUsedPaymentType(start, end)
                .stream().findFirst().orElse("Unknown");

        return AnalyticsDTO.builder()
                .totalTrips(totalTrips)
                .averageFare(averageFare)
                .averageDistance(averageDistance)
                .totalRevenue(totalRevenue)
                .mostPopularPickupZone(mostPopularPickupZone)
                .mostUsedPaymentType(mostUsedPaymentType)
                .build();
    }
}