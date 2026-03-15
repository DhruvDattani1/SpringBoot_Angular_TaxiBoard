package com.taxiboard.backend.controller;

import com.taxiboard.backend.dto.PaymentTypeDTO;
import com.taxiboard.backend.dto.TaxiZoneDTO;
import com.taxiboard.backend.dto.VendorDTO;
import com.taxiboard.backend.service.LookupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LookupController {

    private final LookupService lookupService;

    public LookupController(LookupService lookupService) {
        this.lookupService = lookupService;
    }

    @GetMapping("/paymenttypes")
    public ResponseEntity<List<PaymentTypeDTO>> getPaymentTypes() {
        return ResponseEntity.ok(lookupService.getPaymentTypes());
    }

    @GetMapping("/vendors")
    public ResponseEntity<List<VendorDTO>> getVendors() {
        return ResponseEntity.ok(lookupService.getVendors());
    }

    @GetMapping("/zones")
    public ResponseEntity<List<TaxiZoneDTO>> getZones(
            @RequestParam(required = false) String borough
    ) {
        return ResponseEntity.ok(lookupService.getZones(borough));
    }
}