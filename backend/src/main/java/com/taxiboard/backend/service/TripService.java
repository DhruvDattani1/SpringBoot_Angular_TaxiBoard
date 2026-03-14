package com.taxiboard.backend.service;

import com.taxiboard.backend.entity.YellowTripData;
import com.taxiboard.backend.repository.YellowTripDataRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    ) {
        Specification<YellowTripData> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (startDate != null) {
                LocalDateTime start = startDate.atStartOfDay();
                predicates.add(cb.greaterThanOrEqualTo(root.get("pickupDatetime"), start));
            }
            if (endDate != null) {
                LocalDateTime end = endDate.atTime(23, 59, 59);
                predicates.add(cb.lessThanOrEqualTo(root.get("pickupDatetime"), end));
            }
            if (passengers != null) {
                predicates.add(cb.equal(root.get("passengerCount"), passengers));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return tripRepository.findAll(spec, pageable);
    }
}