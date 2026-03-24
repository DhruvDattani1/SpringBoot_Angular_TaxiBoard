package com.taxiboard.backend;

import com.taxiboard.backend.repository.VendorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import com.taxiboard.backend.security.JwtUtil;


@SpringBootApplication
public class BackendApplication {

    @Autowired
    private JwtUtil jwtUtil;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner testDB(VendorRepository vendorRepository) {
        return args -> {
            System.out.println("Testing DB connection...");

            vendorRepository.findAll().forEach(v ->
                System.out.println(v.getVendorName())
            );
        };
    }

    @PostConstruct
    public void testJwt() {
        System.out.println(jwtUtil.generateToken("dhruvd22"));
    }
}

