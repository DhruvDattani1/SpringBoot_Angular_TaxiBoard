package com.taxiboard.backend.mapper;

import com.taxiboard.backend.dto.PaymentTypeDTO;
import com.taxiboard.backend.entity.PaymentType;

public class PaymentTypeMapper {
    public static PaymentTypeDTO toDTO(PaymentType paymentType) {
        return PaymentTypeDTO.builder()
                .paymentTypeId(paymentType.getPaymentTypeId())
                .paymentDescription(paymentType.getPaymentDescription())
                .build();
    }
}