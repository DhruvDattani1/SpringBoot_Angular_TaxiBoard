package com.taxiboard.backend.mapper;

import com.taxiboard.backend.dto.TripResponseDTO;
import com.taxiboard.backend.entity.YellowTripData;

public class TripMapper {
    public static TripResponseDTO toDTO(YellowTripData trip) {
        return TripResponseDTO.builder()
                .tripId(trip.getId())
                .pickupDatetime(trip.getPickupDatetime())
                .dropoffDatetime(trip.getDropoffDatetime())
                .passengerCount(trip.getPassengerCount())
                .tripDistance(trip.getTripDistance())
                .fareAmount(trip.getFareAmount())
                .vendor(trip.getVendor() != null ? trip.getVendor().getVendorName() : null)
                .paymentType(trip.getPaymentType() != null ? trip.getPaymentType().getPaymentDescription() : null)
                .pickupZone(trip.getPickupLocation() != null ? trip.getPickupLocation().getZone() : null)
                .dropoffZone(trip.getDropoffLocation() != null ? trip.getDropoffLocation().getZone() : null)
                .build();
    }
}