package com.taxiboard.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vendors")
@Getter
@Setter

public class Vendor {

    @Id
    @Column(name = "vendor_id")
    private Integer vendorId;

    @Column(name = "vendor_name", length = 100, nullable = false)
    private String vendorName;

    @OneToMany(mappedBy = "vendor")
    private List<YellowTripData> trips = new ArrayList<>();

    public Vendor() {}
}