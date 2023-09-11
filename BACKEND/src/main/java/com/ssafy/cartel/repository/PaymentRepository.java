package com.ssafy.cartel.repository;

import com.ssafy.cartel.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
