package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.YellowTripData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface YellowTripDataRepository extends JpaRepository<YellowTripData, Long>,
        JpaSpecificationExecutor<YellowTripData> 
{
        
    @Override
    @EntityGraph(attributePaths = {"vendor", "pickupLocation", "dropoffLocation", "paymentType", "rateCode"})
    Page<YellowTripData> findAll(Specification<YellowTripData> spec, Pageable pageable);
}