package com.taxiboard.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "yellow_tripdata")
@Getter
@Setter
public class YellowTripData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "VendorID")
    private Vendor vendor;

    @Column(name = "tpep_pickup_datetime")
    private LocalDateTime pickupDatetime;

    @Column(name = "tpep_dropoff_datetime")
    private LocalDateTime dropoffDatetime;

    @Column(name = "passenger_count")
    private Integer passengerCount;

    @Column(name = "trip_distance", precision = 10, scale = 2)
    private BigDecimal tripDistance;

    @ManyToOne
    @JoinColumn(name = "RatecodeID")
    private RateCode rateCode;

    @Column(name = "store_and_fwd_flag")
    private String storeAndFwdFlag;

    @ManyToOne
    @JoinColumn(name = "PULocationID")
    private TaxiZone pickupLocation;

    @ManyToOne
    @JoinColumn(name = "DOLocationID")
    private TaxiZone dropoffLocation;

    @ManyToOne
    @JoinColumn(name = "payment_type")
    private PaymentType paymentType;

    @Column(name = "fare_amount", precision = 10, scale = 2)
    private BigDecimal fareAmount;

    @Column(name = "extra", precision = 10, scale = 2)
    private BigDecimal extra;

    @Column(name = "mta_tax", precision = 10, scale = 2)
    private BigDecimal mtaTax;

    @Column(name = "tip_amount", precision = 10, scale = 2)
    private BigDecimal tipAmount;

    @Column(name = "tolls_amount", precision = 10, scale = 2)
    private BigDecimal tollsAmount;

    @Column(name = "improvement_surcharge", precision = 10, scale = 2)
    private BigDecimal improvementSurcharge;

    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "congestion_surcharge", precision = 10, scale = 2)
    private BigDecimal congestionSurcharge;

    @Column(name = "Airport_fee", precision = 10, scale = 2)
    private BigDecimal airportFee;

    @Column(name = "cbd_congestion_fee", precision = 10, scale = 2)
    private BigDecimal cbdCongestionFee;

    public YellowTripData() {}
}