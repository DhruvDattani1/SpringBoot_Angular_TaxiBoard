package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.TaxiZone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxiZoneRepository extends JpaRepository<TaxiZone, Integer> {

}