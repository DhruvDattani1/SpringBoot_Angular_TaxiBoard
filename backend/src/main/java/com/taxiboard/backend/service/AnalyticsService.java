package com.taxiboard.backend.service;

import com.taxiboard.backend.dto.AnalyticsDTO;
import com.taxiboard.backend.entity.YellowTripData;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnalyticsService {

    private final EntityManager entityManager;

    public AnalyticsService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public AnalyticsDTO getAnalytics(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("startDate must be before endDate");
        }
        LocalDateTime start = startDate != null ? startDate.atStartOfDay() : null;
        LocalDateTime end = endDate != null ? endDate.atTime(23, 59, 59) : null;

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();


        CriteriaQuery<Object[]> aggQuery = cb.createQuery(Object[].class);
        Root<YellowTripData> root = aggQuery.from(YellowTripData.class);

        aggQuery.multiselect(
                cb.count(root),
                cb.avg(root.get("fareAmount")),
                cb.avg(root.get("tripDistance")),
                cb.sum(root.get("totalAmount"))
        );

        List<Predicate> predicates = buildDatePredicates(cb, root, start, end);
        if (!predicates.isEmpty()) {
            aggQuery.where(predicates.toArray(new Predicate[0]));
        }

        Object[] aggResult = entityManager.createQuery(aggQuery).getSingleResult();
        Long totalTrips = ((Number) aggResult[0]).longValue();
        BigDecimal averageFare = aggResult[1] != null ? BigDecimal.valueOf(((Number) aggResult[1]).doubleValue()).setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
        BigDecimal averageDistance = aggResult[2] != null ? BigDecimal.valueOf(((Number) aggResult[2]).doubleValue()).setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
        BigDecimal totalRevenue = aggResult[3] != null ? BigDecimal.valueOf(((Number) aggResult[3]).doubleValue()).setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;

        CriteriaQuery<String> zoneQuery = cb.createQuery(String.class);
        Root<YellowTripData> zoneRoot = zoneQuery.from(YellowTripData.class);
        zoneQuery.select(zoneRoot.get("pickupLocation").get("zone"));
        zoneQuery.where(buildDatePredicates(cb, zoneRoot, start, end).toArray(new Predicate[0]));
        zoneQuery.groupBy(zoneRoot.get("pickupLocation").get("zone"));
        zoneQuery.orderBy(cb.desc(cb.count(zoneRoot)));

        List<String> zones = entityManager.createQuery(zoneQuery).setMaxResults(1).getResultList();
        String mostPopularPickupZone = zones.isEmpty() ? "Unknown" : zones.get(0);

        CriteriaQuery<String> paymentQuery = cb.createQuery(String.class);
        Root<YellowTripData> paymentRoot = paymentQuery.from(YellowTripData.class);
        paymentQuery.select(paymentRoot.get("paymentType").get("paymentDescription"));
        paymentQuery.where(buildDatePredicates(cb, paymentRoot, start, end).toArray(new Predicate[0]));
        paymentQuery.groupBy(paymentRoot.get("paymentType").get("paymentDescription"));
        paymentQuery.orderBy(cb.desc(cb.count(paymentRoot)));

        List<String> payments = entityManager.createQuery(paymentQuery).setMaxResults(1).getResultList();
        String mostUsedPaymentType = payments.isEmpty() ? "Unknown" : payments.get(0);

        return AnalyticsDTO.builder()
                .totalTrips(totalTrips)
                .averageFare(averageFare)
                .averageDistance(averageDistance)
                .totalRevenue(totalRevenue)
                .mostPopularPickupZone(mostPopularPickupZone)
                .mostUsedPaymentType(mostUsedPaymentType)
                .build();
    }

    private List<Predicate> buildDatePredicates(CriteriaBuilder cb, Root<YellowTripData> root,
                                                  LocalDateTime start, LocalDateTime end) {
        List<Predicate> predicates = new java.util.ArrayList<>();
        if (start != null) predicates.add(cb.greaterThanOrEqualTo(root.get("pickupDatetime"), start));
        if (end != null) predicates.add(cb.lessThanOrEqualTo(root.get("pickupDatetime"), end));
        return predicates;
    }
}