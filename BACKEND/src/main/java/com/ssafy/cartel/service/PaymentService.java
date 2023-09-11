package com.ssafy.cartel.service;


import com.ssafy.cartel.controller.PaymentController;
import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Payment;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.PaymentDto;
import com.ssafy.cartel.dto.UserDto;
import com.ssafy.cartel.repository.ClientRepository;
import com.ssafy.cartel.repository.PaymentRepository;
import com.ssafy.cartel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ClientRepository clientRepository;

    public Payment save(PaymentDto paymentDto,Integer clientId){
       Client client = clientRepository.findById(clientId)
                .orElseThrow(()-> new IllegalArgumentException("not found user"));

        return paymentRepository.save(Payment.builder()
                .status(0)
                .amount(paymentDto.getAmount())
                .time(LocalDateTime.now())
                .client(client)
                .method("카카오 페이")
                .build());
    }
}
