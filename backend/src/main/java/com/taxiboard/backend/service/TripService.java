package com.taxiboard.backend.service;

import com.taxiboard.backend.entity.YellowTripData;
import com.taxiboard.backend.repository.YellowTripDataRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
public class TripService {

    private final YellowTripDataRepository tripRepository;

    public TripService(YellowTripDataRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public Page<YellowTripData> getTrips(
        LocalDate startDate,
        LocalDate endDate,
        Integer passengers,
        Pageable pageable
    )
    {
        LocalDateTime start = startDate != null ? startDate.atStartOfDay() : null;
        LocalDateTime end = endDate != null ? endDate.atTime(23, 59, 59) : null;
        return tripRepository.findTrips(start, end, passengers, pageable);
    }
}