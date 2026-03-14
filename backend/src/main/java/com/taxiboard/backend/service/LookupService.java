package com.taxiboard.backend.service;

import com.taxiboard.backend.entity.PaymentType;
import com.taxiboard.backend.entity.Vendor;
import com.taxiboard.backend.entity.TaxiZone;
import com.taxiboard.backend.repository.PaymentTypeRepository;
import com.taxiboard.backend.repository.VendorRepository;
import com.taxiboard.backend.repository.TaxiZoneRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LookupService {

    private final PaymentTypeRepository paymentTypeRepository;
    private final VendorRepository vendorRepository;
    private final TaxiZoneRepository taxiZoneRepository;

    public LookupService(
            PaymentTypeRepository paymentTypeRepository,
            VendorRepository vendorRepository,
            TaxiZoneRepository taxiZoneRepository
    ) {
        this.paymentTypeRepository = paymentTypeRepository;
        this.vendorRepository = vendorRepository;
        this.taxiZoneRepository = taxiZoneRepository;
    }

    public List<PaymentType> getPaymentTypes() {
        return paymentTypeRepository.findAll();
    }

    public List<Vendor> getVendors() {
        return vendorRepository.findAll();
    }

    public List<TaxiZone> getZones(String borough) {

        if (borough == null) {
            return taxiZoneRepository.findAll();
        }

        return taxiZoneRepository.findByBoroughIgnoreCase(borough);
    }
}