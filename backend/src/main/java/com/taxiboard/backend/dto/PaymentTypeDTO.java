package com.taxiboard.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;


@Getter
@Setter
@Builder
public class PaymentTypeDTO {

    private Integer paymentTypeId;
    private String paymentDescription;
}