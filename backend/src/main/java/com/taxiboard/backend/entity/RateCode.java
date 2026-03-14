package com.taxiboard.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rate_codes")
@Getter
@Setter

public class RateCode {

    @Id
    @Column(name = "rate_code_id")
    private Integer rateCodeId;

    @Column(name = "rate_description", length = 50, nullable = false)
    private String rateDescription;

    @OneToMany(mappedBy = "rateCode")
    private List<YellowTripData> trips = new ArrayList<>();

    public RateCode() {}
}