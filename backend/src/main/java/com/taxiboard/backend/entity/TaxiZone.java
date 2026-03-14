package com.taxiboard.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "taxi_zones")
@Getter
@Setter
public class TaxiZone {

    @Id
    @Column(name = "LocationID")
    private Integer locationId;

    @Column(name = "Borough", length = 50)
    private String borough;

    @Column(name = "Zone", length = 100)
    private String zone;

    @Column(name = "service_zone", length = 50)
    private String serviceZone;

    @OneToMany(mappedBy = "pickupLocation")
    private List<YellowTripData> pickupTrips = new ArrayList<>();

    @OneToMany(mappedBy = "dropoffLocation")
    private List<YellowTripData> dropoffTrips = new ArrayList<>();

    public TaxiZone() {}
}