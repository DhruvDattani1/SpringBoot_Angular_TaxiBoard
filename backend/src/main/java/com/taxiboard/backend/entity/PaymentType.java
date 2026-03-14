package com.taxiboard.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "payment_types")
@Getter
@Setter
public class PaymentType {

    @Id
    @Column(name = "payment_type_id")
    private Integer paymentTypeId;

    @Column(name = "payment_description", length = 50, nullable = false)
    private String paymentDescription;

    @OneToMany(mappedBy = "paymentType")
    private List<YellowTripData> trips = new ArrayList<>();

    public PaymentType() {}
}