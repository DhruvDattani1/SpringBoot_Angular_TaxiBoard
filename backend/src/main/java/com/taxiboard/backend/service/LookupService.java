package com.taxiboard.backend.service;

import com.taxiboard.backend.dto.PaymentTypeDTO;
import com.taxiboard.backend.dto.TaxiZoneDTO;
import com.taxiboard.backend.dto.VendorDTO;
import com.taxiboard.backend.mapper.PaymentTypeMapper;
import com.taxiboard.backend.mapper.TaxiZoneMapper;
import com.taxiboard.backend.mapper.VendorMapper;
import com.taxiboard.backend.repository.PaymentTypeRepository;
import com.taxiboard.backend.repository.TaxiZoneRepository;
import com.taxiboard.backend.repository.VendorRepository;
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

    public List<PaymentTypeDTO> getPaymentTypes() {
        return paymentTypeRepository.findAll().stream()
                .map(PaymentTypeMapper::toDTO)
                .toList();
    }

    public List<VendorDTO> getVendors() {
        return vendorRepository.findAll().stream()
                .map(VendorMapper::toDTO)
                .toList();
    }

    public List<TaxiZoneDTO> getZones(String borough) {
        var zones = borough == null
                ? taxiZoneRepository.findAll()
                : taxiZoneRepository.findByBoroughIgnoreCase(borough);

        return zones.stream()
                .map(TaxiZoneMapper::toDTO)
                .toList();
    }
}