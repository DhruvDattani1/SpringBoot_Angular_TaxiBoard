package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.YellowTripData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface YellowTripDataRepository extends JpaRepository<YellowTripData, Long>,
        JpaSpecificationExecutor<YellowTripData> {

    @Query("SELECT COUNT(t), AVG(t.fareAmount), AVG(t.tripDistance), SUM(t.totalAmount) " +
           "FROM YellowTripData t WHERE " +
           "(:start IS NULL OR t.pickupDatetime >= :start) AND " +
           "(:end IS NULL OR t.pickupDatetime <= :end)")
    List<Object[]> getAggregates(@Param("start") LocalDateTime start,
                                  @Param("end") LocalDateTime end);

    @Query("SELECT t.pickupLocation.zone FROM YellowTripData t WHERE " +
           "(:start IS NULL OR t.pickupDatetime >= :start) AND " +
           "(:end IS NULL OR t.pickupDatetime <= :end) AND " +
           "t.pickupLocation IS NOT NULL " +
           "GROUP BY t.pickupLocation.zone ORDER BY COUNT(t) DESC")
    List<String> getMostPopularPickupZone(@Param("start") LocalDateTime start,
                                           @Param("end") LocalDateTime end);

    @Query("SELECT t.paymentType.paymentDescription FROM YellowTripData t WHERE " +
           "(:start IS NULL OR t.pickupDatetime >= :start) AND " +
           "(:end IS NULL OR t.pickupDatetime <= :end) AND " +
           "t.paymentType IS NOT NULL " +
           "GROUP BY t.paymentType.paymentDescription ORDER BY COUNT(t) DESC")
    List<String> getMostUsedPaymentType(@Param("start") LocalDateTime start,
                                         @Param("end") LocalDateTime end);
}