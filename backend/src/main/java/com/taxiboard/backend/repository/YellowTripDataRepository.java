package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.YellowTripData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface YellowTripDataRepository extends JpaRepository<YellowTripData, Long> {

}