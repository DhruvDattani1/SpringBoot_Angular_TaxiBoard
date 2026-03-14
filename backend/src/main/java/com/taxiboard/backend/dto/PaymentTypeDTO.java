package com.taxiboard.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentTypeDTO {

    private Integer paymentTypeId;
    private String paymentDescription;
}