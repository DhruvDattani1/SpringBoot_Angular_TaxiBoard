package com.taxiboard.backend;

import com.taxiboard.backend.repository.VendorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

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
}
