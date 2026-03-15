package com.taxiboard.backend.controller;

import com.taxiboard.backend.dto.TripResponseDTO;
import com.taxiboard.backend.service.TripService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<Page<TripResponseDTO>> getTrips(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Integer passengers,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int pageSize,
            @RequestParam(required = false) Integer paymentType,
            @RequestParam(required = false) Integer pickupZone,
            @RequestParam(required = false) Integer vendor


    ) {
        Pageable pageable = PageRequest.of(
                page,
                pageSize,
                Sort.by("pickupDatetime").descending()
        );
        return ResponseEntity.ok(tripService.getTrips(startDate, endDate, passengers, paymentType, pickupZone, vendor, pageable));
    }
}