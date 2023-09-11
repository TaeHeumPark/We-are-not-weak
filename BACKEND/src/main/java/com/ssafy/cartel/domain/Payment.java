package com.ssafy.cartel.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.lang.reflect.Type;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_state_id", updatable = false)
    private Integer id;

    @Column(name = "payment_status", nullable = false)
    private Integer status;

    @Column(name = "payment_amount", nullable = false)
    private Integer amount;

    @Column(name = "payment_time", nullable = false)
    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(name = "payment_id", nullable = false)
    private String paymentId;

    @Column(name = "payment_method", nullable = false)
    private String method;

//    @Column(name = "counsel_id", nullable = false)
//    private Integer counselId;


    @Builder
    public Payment(Integer status, Integer amount, LocalDateTime time, Client client, String paymentId, String method) {
        this.status = status;
        this.amount = amount;
        this.time = time;
        this.client= client;
        this.paymentId = paymentId;
        this.method = method;
        //this.counselId = counselId;
    }
}
