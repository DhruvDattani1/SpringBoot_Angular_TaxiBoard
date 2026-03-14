package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTypeRepository extends JpaRepository<PaymentType, Integer> {

}