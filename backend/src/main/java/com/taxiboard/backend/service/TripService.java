package com.taxiboard.backend.service;

import com.taxiboard.backend.entity.YellowTripData;
import com.taxiboard.backend.repository.YellowTripDataRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class TripService {

    private final YellowTripDataRepository tripRepository;

    public TripService(YellowTripDataRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public Page<YellowTripData> getTrips(
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer passengers,
        Pageable pageable
    )
    {
        return tripRepository.findTrips(startDate, endDate, passengers, pageable);
    }
}