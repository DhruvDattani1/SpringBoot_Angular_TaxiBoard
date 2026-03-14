package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.TaxiZone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxiZoneRepository extends JpaRepository<TaxiZone, Integer> {

    List<TaxiZone> findByBoroughIgnoreCase(String borough);

}