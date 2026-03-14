package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.YellowTripData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;

public interface YellowTripDataRepository extends JpaRepository<YellowTripData, Long> {

    @Query("SELECT t FROM YellowTripData t WHERE " +
           "(:startDate IS NULL OR t.pickupDatetime >= :startDate) AND " +
           "(:endDate IS NULL OR t.pickupDatetime <= :endDate) AND " +
           "(:passengers IS NULL OR t.passengerCount = :passengers)")
    Page<YellowTripData> findTrips(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("passengers") Integer passengers,
            Pageable pageable
    );
}