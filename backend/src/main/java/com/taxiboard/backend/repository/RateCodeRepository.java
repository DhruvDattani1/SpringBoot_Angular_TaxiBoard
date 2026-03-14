package com.taxiboard.backend.repository;

import com.taxiboard.backend.entity.RateCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RateCodeRepository extends JpaRepository<RateCode, Integer> {

}